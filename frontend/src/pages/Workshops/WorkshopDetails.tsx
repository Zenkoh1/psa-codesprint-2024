import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

interface Workshop {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

const workshopsData: Workshop[] = [
  {
    id: 1,
    title: "Time Management Skills",
    description:
      "Learn how to manage your time effectively with this workshop.",
    date: "2024-11-12",
    location: "Conference Room A",
  },
  {
    id: 2,
    title: "Leadership 101",
    description: "An introductory workshop on leadership skills.",
    date: "2024-11-19",
    location: "Zoom",
  },
  // Add more workshops as needed
];

const WorkshopDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the specific workshop by ID
  const workshop = workshopsData.find((workshop) => workshop.id === Number(id));

  if (!workshop) {
    return <Box py={5}>Workshop not found</Box>;
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
        <strong>Date:</strong> {workshop.date}
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        <strong>Location:</strong> {workshop.location}
      </Typography>
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
