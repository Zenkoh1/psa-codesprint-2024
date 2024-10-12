import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Paper,
  TextField,
  TextFieldProps,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import { useSearchParams } from "react-router-dom";
import CategoryType from "../types/Category.type";
import SearchIcon from "@mui/icons-material/Search";
import Tune from "@mui/icons-material/Tune";
import FilterDialog from "../components/FilterDialog";

const AIChatbot = () => {
  return <Box>Placeholder</Box>;
};

const Calendar = () => {
  return (
    <Paper elevation={2} sx={{ mb: 2, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Calendar
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Placeholder for a calendar widget
      </Typography>
    </Paper>
  );
};
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

const UpcomingWorkshops = () => (
  <Paper elevation={2} sx={{ p: 2 }}>
    <Typography variant="h6" gutterBottom>
      Upcoming Workshops
    </Typography>
    <List>
      <ListItem>
        <ListItemText
          primary="Time Management Skills"
          secondary="2024-11-12 | Conference Room A"
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Leadership 101" secondary="2024-11-19 | Zoom" />
      </ListItem>
    </List>
  </Paper>
);

const Homepage = () => {
  return (
    <Box sx={{ p: 3, height: "100vh" }}>
      <Grid container spacing={3} sx={{ height: "100%" }}>
        {/* Left Side - 3/4 of the screen */}
        <Grid item xs={12} md={9}>
          <AIChatbot />
        </Grid>

        {/* Right Side - 1/4 of the screen */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            {/* Calendar Widget */}
            <Calendar />

            {/* Forum Widget */}
            <ForumWidget />

            {/* Upcoming Workshops Widget */}
            <UpcomingWorkshops />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
