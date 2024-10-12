import { Paper, Typography } from "@mui/material";

const ForumWidget = () => (
  <Paper elevation={2} sx={{ mb: 2, p: 2 }}>
    <Typography variant="h6" gutterBottom>
      Forum
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Placeholder for forum discussions
    </Typography>
  </Paper>
);

export default ForumWidget;
