import { Grid, Typography } from "@mui/material";

type WetherCardItemProps = {
  label: string;
  value: string | number;
  fullWidth?: boolean;
};

export function WetherCardItem({
  label,
  value,
  fullWidth,
}: WetherCardItemProps) {
  return (
    <Grid size={{ xs: fullWidth ? 12 : 6 }}>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="subtitle2">{value}</Typography>
    </Grid>
  );
}
