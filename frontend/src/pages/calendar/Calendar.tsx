import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
} from "@mui/material";
import { useEffect, useState } from "react";
import useAPI from "../../api/useAPI";
import session from "../../api/sessions_manager";
import CalendarEventType from "../../types/CalendarEvent.type";
import dayjs, { Dayjs } from "dayjs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";

const CalendarPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_time: new Date(),
    end_time: new Date(),
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
    });
  };

  // Get today's events
  const todayEvents = calendarEventData?.filter(
    (event) =>
      new Date(event.start_time).toDateString() === new Date().toDateString(),
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
      p={4}
    >
      <Grid container spacing={2} sx={{ width: "80%", maxWidth: 1200 }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth" // Default view when loaded
              views={{
                dayGridMonth: { buttonText: "Month" },
                timeGridWeek: { buttonText: "Week" }, // Add week view
              }}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek", // Button for week view
              }}
              events={calendarEventData?.map((event) => ({
                title: event.title,
                start: event.start_time,
                end: event.end_time,
              }))}
            />
          </Paper>
        </Grid>

        {/* Right Half: Events Today and Create Event Card (30% of width) */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6">Events Today</Typography>
            <Box
              sx={{
                maxHeight: "200px",
                overflowY: "scroll",
                mb: 2,
              }}
            >
              {todayEvents && todayEvents.length > 0 ? (
                todayEvents.map((event) => (
                  <Card key={event.id} sx={{ mb: 2, p: 2 }}>
                    <Typography variant="h6">{event.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(event.start_time).format("h:mm A")} -{" "}
                      {dayjs(event.end_time).format("h:mm A")}
                    </Typography>
                  </Card>
                ))
              ) : (
                <Typography variant="body2">No events today</Typography>
              )}
            </Box>

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
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <DateTimePicker
              label="Start time"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
              }}
              value={dayjs(formData.start_time)}
              onChange={(newValue) => {
                if (newValue) {
                  setFormData({
                    ...formData,
                    start_time: newValue.toDate(),
                  });
                }
              }}
              sx={{ mb: 2, mt: 2, width: "100%" }}
            />
            <DateTimePicker
              label="End time"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
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
              sx={{ mb: 2, mt: 1, width: "100%" }}
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
      </Grid>
    </Box>
  );
};

export default CalendarPage;
