import { Box, Typography, List, ListItemButton } from "@mui/material";
import type { CitySuggestion } from "../weatherApi";

type SearchHistoryProps = {
  history: CitySuggestion[];
  onSelect: (val: CitySuggestion) => void;
};

export default function SearchHistory({
  history,
  onSelect,
}: SearchHistoryProps) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Search History</Typography>
      <List>
        {history.length > 0 ? (
          history.map((item) => (
            <ListItemButton
              sx={{ border: "1px solid lightgray", borderRadius: 1, mb: 1 }}
              key={item.id}
              onClick={() => onSelect(item)}
            >
              {item.name}, {item.country}
            </ListItemButton>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No search history available.
          </Typography>
        )}
      </List>
    </Box>
  );
}
