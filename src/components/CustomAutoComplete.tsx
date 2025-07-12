import React from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import type {
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material/Autocomplete";

interface CustomAutoCompleteProps<T> {
  options: T[];
  freeSolo?: boolean;
  loading?: boolean;
  label?: string;
  value?: T | null;
  fullWidth?: boolean;
  getOptionLabel: (option: T | string) => string;
  onInputChange: (event: React.SyntheticEvent, value: string) => void;
  onChange: (
    event: React.SyntheticEvent,
    value: string | T | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string | T>
  ) => void;
}

function CustomAutoComplete<T>(props: CustomAutoCompleteProps<T>) {
  const {
    label,
    options,
    freeSolo = false,
    loading = false,
    fullWidth = true,
    value,
    getOptionLabel,
    onInputChange,
    onChange,
  } = props;

  return (
    <Autocomplete
      freeSolo={freeSolo}
      autoHighlight
      options={options}
      getOptionLabel={getOptionLabel}
      loading={loading}
      onInputChange={onInputChange}
      onChange={onChange}
      value={value ?? null}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label || "Asynchronous"}
          fullWidth={fullWidth}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
}

export default CustomAutoComplete;
