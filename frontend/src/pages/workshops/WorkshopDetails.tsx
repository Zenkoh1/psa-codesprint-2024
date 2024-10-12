import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import useAPI from "../../api/useAPI";
import WorkshopType from "../../types/Workshop.type";
import { useEffect } from "react";

const WorkshopDetails = () => {
  const { id } = useParams<{ id: string }>();

  const {
    fetchAPI: fetchWorkshop,
    loading: loadingWorkshop,
    data: workshop,
  } = useAPI<WorkshopType>(`/api/v1/workshops/${id}`);

  const { fetchAPI: registerWorkshopAPI } = useAPI(
    `/api/v1/workshops/${id}/register`,
    {
      method: "POST",
    },
  );

  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkshop();
  }, []);

  const handleRegister = () => {
    registerWorkshopAPI()
      .then(() => {
        alert("Registered successfully!");
      })
      .catch(() => {
        alert("Error registering, try logging in!");
      });
  };

  if (!workshop) {
    return <Box py={5}>Workshop not found</Box>;
  }

  if (loadingWorkshop) {
    return <Box py={5}>Loading workshop</Box>;
  }

  return (
    <Box sx={{ py: 5, px: 30 }}>
      <Typography variant="h4" gutterBottom>
        {workshop.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {workshop.description}
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        <strong>Start time:</strong> {workshop.start_time.toString()}
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        <strong>End time:</strong> {workshop.end_time.toString()}
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        <strong>Venue:</strong> {workshop.venue}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleRegister()}
        sx={{ mt: 3 }}
      >
        Register
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/workshops")}
        sx={{ mt: 3 }}
      >
        Back to Workshops
      </Button>
    </Box>
  );
};

export default WorkshopDetails;
