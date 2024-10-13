import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  Badge,
} from "@mui/material";
import {
  DateCalendar,
  DateTimePicker,
  PickersDay,
  PickersDayProps,
  renderTimeViewClock,
} from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import useAPI from "../../api/useAPI";
import session from "../../api/sessions_manager";
import CalendarEventType from "../../types/CalendarEvent.type";
import dayjs, { Dayjs } from "dayjs";

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

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_time: new Date(),
    end_time: new Date(),
    venue: "",
  });

  const {
    fetchAPI,
    loading: loadingEvents,
    data: calendarEventData,
  } = useAPI<CalendarEventType[]>(
    `/api/v1/events/get_user_events?user_id=${session.getters.getUser().id}`,
  );

  const { fetchAPI: createEvent } = useAPI("/api/v1/events/", {
    method: "POST",
    data: {
      title: formData.title,
      start_time: formData.start_time,
      end_time: formData.end_time,
      user_id: session.getters.getUser().id,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    fetchAPI();
  }, []);

  // Handle event creation
  const handleCreateEvent = () => {
    createEvent();
    fetchAPI();

    setFormData({
      title: "",
      description: "",
      start_time: new Date(),
      end_time: new Date(),
      venue: "",
    });
  };

  // Get upcoming events
  const upcomingEvents = calendarEventData?.filter(
    (event) => new Date(event.start_time) > new Date(),
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={2} sx={{ width: "80%", maxWidth: 1200 }}>
        {/* Left Half: Event Creation Form (70% of width) */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6">Create an Event</Typography>
            <TextField
              label="Event Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <DateTimePicker
              label="Start time"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              value={dayjs(formData.end_time)}
              onChange={(newValue) => {
                if (newValue) {
                  setFormData({
                    ...formData,
                    start_time: newValue.toDate(),
                  });
                }
              }}
            />
            <DateTimePicker
              label="End time"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              value={dayjs(formData.end_time)}
              onChange={(newValue) => {
                if (newValue) {
                  setFormData({
                    ...formData,
                    end_time: newValue.toDate(),
                  });
                }
              }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateEvent}
            >
              Create Event
            </Button>
          </Paper>
        </Grid>

        {/* Right Half: Calendar and Upcoming Events (30% of width) */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6">
              {new Intl.DateTimeFormat("en-US", {
                day: "numeric",
                month: "short",
                weekday: "long",
              }).format(selectedDate.toDate())}
            </Typography>
            <DateCalendar
              value={selectedDate}
              onChange={(newValue) => {
                if (newValue) {
                  setSelectedDate(newValue);
                }
              }}
              slots={{
                day: ServerDay,
              }}
              slotProps={{
                day: {
                  highlightedDays: calendarEventData?.reduce((acc, event) => {
                    // Gets all dates between start and end date
                    const start = new Date(event.start_time);
                    const end = new Date(event.end_time);
                    const days = [];
                    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
                      days.push(new Date(d));
                    }
                    return [...acc, ...days];
                  }, [] as Date[]),
                } as any,
              }}
            />

            <Typography variant="h6">Upcoming Events</Typography>
            {upcomingEvents && upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <Card key={event.id} sx={{ mb: 2, p: 2 }}>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {dayjs(event.start_time).format("h:mm A")} -{" "}
                    {dayjs(event.end_time).format("h:mm A")}
                  </Typography>
                </Card>
              ))
            ) : (
              <Typography variant="body2">No upcoming events</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CalendarPage;
