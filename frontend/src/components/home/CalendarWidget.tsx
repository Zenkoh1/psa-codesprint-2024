import { Paper } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";

// TODO: Add icons to tell when there are events
const CalendarWidget = () => {
  return (
    <Paper elevation={2} sx={{ mb: 2, p: 2 }}>
      <DateCalendar views={["day"]} />
    </Paper>
  );
};

export default CalendarWidget;
