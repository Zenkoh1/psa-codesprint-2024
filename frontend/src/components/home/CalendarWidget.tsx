import { Badge, Box, IconButton, Paper, Typography } from "@mui/material";
import { DateCalendar, PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import useAPI from "../../api/useAPI";
import session from "../../api/sessions_manager";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CalendarEventType from "../../types/CalendarEvent.type";
import { Dayjs } from "dayjs";
import { ArrowForward } from "@mui/icons-material";

const ServerDay = (
  props: PickersDayProps<Dayjs> & { highlightedDays?: Date[] },
) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !outsideCurrentMonth &&
    highlightedDays
      .filter(
        (date: Date) =>
          date.getMonth() === day.month() && date.getFullYear() === day.year(),
      )
      .map((date: Date) => date.getDate())
      .indexOf(day.date()) >= 0;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "⭐" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
};

const CalendarWidget = () => {
  const {
    fetchAPI,
    loading,
    data: calendarEventData,
  } = useAPI<CalendarEventType[]>(
    `/api/v1/events/get_user_events?user_id=${session.getters.getUser().id}`,
  );

  useEffect(() => {
    fetchAPI();
  }, []);

  const navigate = useNavigate();

  return (
    <Paper elevation={2} sx={{ mb: 2, p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "short",
            weekday: "long",
          }).format(new Date())}
        </Typography>
        <IconButton onClick={() => navigate("/calendar")} size="large">
          <ArrowForward />
        </IconButton>
      </Box>
      <Box
        sx={{
          maxWidth: "100%",
          width: "100%",
          overflowX: "auto", // Allows horizontal scrolling on smaller screens
        }}
      >
        <DateCalendar
          views={["day"]}
          slots={{ day: ServerDay }}
          sx={{ width: "100%" }} // Ensure the calendar uses the available space
          slotProps={{
            day: {
              highlightedDays: calendarEventData?.reduce((acc, event) => {
                const start = new Date(event.start_time);
                start.setHours(0, 0, 0, 0);
                const end = new Date(event.end_time);
                end.setHours(23, 59, 59, 999);
                const days = [];
                for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
                  days.push(new Date(d));
                }
                return [...acc, ...days];
              }, [] as Date[]),
            } as any,
          }}
        />
      </Box>
    </Paper>
  );
};

export default CalendarWidget;
