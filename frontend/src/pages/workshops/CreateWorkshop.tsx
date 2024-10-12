import React, { useState } from "react";
import { Box, Button, TextField, Typography, Stack, Grid } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { useNavigate } from "react-router-dom";
import session from "../../api/sessions_manager";
import useAPI from "../../api/useAPI";
import dayjs from "dayjs";

const CreateWorkshop = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_time: new Date(),
    end_time: new Date(),
    venue: "",
  });

  const navigate = useNavigate();

  const { fetchAPI: createWorkshop } = useAPI("/api/v1/workshops", {
    method: "POST",
    data: {
      workshop: {
        title: formData.title,
        venue: formData.venue,
        description: formData.description,
        start_time: formData.start_time,
        end_time: formData.end_time,
        host_id: session.getters.getUser().id,
      },
    },
    headers: {
      "content-type": "application/json",
    },
  });

  // Handle form input changes, except for date times
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createWorkshop();
      // Redirect back to workshops page after successful creation
      setTimeout(() => {
        navigate("/workshops");
      }, 2000);
    } catch (error) {
      alert("Failed to create workshop");
    }
  };

  if (!session.getters.getUser().admin) {
    return (
      <Box>
        <h2>Unauthorized</h2>
        <Button onClick={() => navigate("/")}>Return to home</Button>
      </Box>
    );
  }

  // TODO: Make this side by side
  return (
    <Box width="60vw" display="inline-block" px="20vw" py="5vh">
      <Typography variant="h4" gutterBottom>
        Create New Workshop
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Venue"
              name="venue"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DateTimePicker
              label="Start time"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
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
            />
          </Grid>
          <Grid item xs={12} md={4}>
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
          </Grid>
        </Grid>
        <Box textAlign="center" py={3}>
          <Button type="submit" variant="contained" color="primary">
            Create workshop
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateWorkshop;
