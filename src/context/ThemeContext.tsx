import React, { createContext, useMemo, useState, useEffect } from "react";
import { createTheme, ThemeProvider, type PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
const THEME_STORAGE_KEY = "ofit-theme";
type CustomThemeProviderProps = {
  children: React.ReactNode;
};

const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "light" as PaletteMode,
});

export function useColorMode() {
  const context = React.useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a CustomThemeProvider");
  }
  return context;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    const storedMode = localStorage.getItem(THEME_STORAGE_KEY) as PaletteMode;
    if (storedMode) setMode(storedMode);
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem(THEME_STORAGE_KEY, newMode);
          return newMode;
        });
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
