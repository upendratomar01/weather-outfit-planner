import { Box, Typography, List, ListItemButton } from "@mui/material";

type SearchHistoryProps = {
  history: string[];
  onSelect: (input: string) => void;
};

export default function SearchHistory({
  history,
  onSelect,
}: SearchHistoryProps) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Search History</Typography>
      <List>
        {history.map((item, i) => (
          <ListItemButton
            sx={{ border: "1px solid lightgray", borderRadius: 1, mb: 1 }}
            key={i}
            onClick={() => onSelect(item)}
          >
            {item}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
