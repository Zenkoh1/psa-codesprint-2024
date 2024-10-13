import { Grid, Card, Typography } from "@mui/material";
import { ReactNode } from "react";

type ChartGridProps = {
  title: string;
  children: ReactNode;
};

const ChartGrid = ({ title, children }: ChartGridProps) => {
  return (
    <Grid item xs={6} md={4}>
      <Card
        sx={{
          mb: 2,
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: 3,
          },
        }}
      >
        <Typography variant="h5" pt={2} textAlign="center">
          {title}
        </Typography>
        {children}
      </Card>
    </Grid>
  );
};

export default ChartGrid;
