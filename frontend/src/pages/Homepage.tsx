import { Box, Grid, Typography } from "@mui/material";

import Chatbot from "../components/home/Chatbot";
import CalendarWidget from "../components/home/CalendarWidget";
import ForumWidget from "../components/home/ForumWidget";
import WorkshopsWidget from "../components/home/WorkshopsWidget";

const Homepage = () => {
  return (
    <Box sx={{ p: 3, height: "100vh" }}>
      <Grid container spacing={3} sx={{ height: "100%" }}>
        <Grid item xs={12} md={9}>
          <Chatbot />
        </Grid>

        <Grid item xs={12} md={3}>
          <Box
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CalendarWidget />
            <ForumWidget />
            <WorkshopsWidget />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
