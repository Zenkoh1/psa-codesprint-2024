import {
  CardContent,
  Paper,
  Typography,
  Card,
  Box,
  IconButton,
} from "@mui/material";
import WorkshopType from "../../types/Workshop.type";
import { useNavigate } from "react-router-dom";
import useAPI from "../../api/useAPI";
import { useEffect } from "react";
import { ArrowForward } from "@mui/icons-material";
import formatDate from "../../utils/formatDate";

const WorkshopCard = ({
  workshop,
  onClick,
}: {
  workshop: WorkshopType;
  onClick: () => void;
}) => {
  return (
    <Card
      sx={{
        mb: 2,
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 3,
        },
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {workshop.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Date:</strong> {formatDate(workshop.start_time)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Location:</strong> {workshop.venue}
        </Typography>
      </CardContent>
    </Card>
  );
};

const WorkshopsWidget = () => {
  const navigate = useNavigate();

  const {
    fetchAPI: fetchWorkshops,
    loading: loadingWorkshops,
    data: workshops,
  } = useAPI<Array<WorkshopType>>("/api/v1/workshops");

  useEffect(() => {
    fetchWorkshops();
  }, []);

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Upcoming Workshops
        </Typography>
        <IconButton onClick={() => navigate("/workshops")} size="large">
          <ArrowForward />
        </IconButton>
      </Box>

      {loadingWorkshops && <p>Loading workshops</p>}
      {workshops?.length === 0 && <p>No workshops available</p>}
      {workshops
        ?.filter(
          (workshop: WorkshopType) =>
            new Date(workshop.start_time) > new Date(),
        )
        .sort(
          (a: WorkshopType, b: WorkshopType) =>
            new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
        )
        .slice(0, 2)
        .map((workshop: WorkshopType) => (
          <WorkshopCard
            key={workshop.id}
            workshop={workshop}
            onClick={() => navigate(`/workshops/${workshop.id}`)}
          />
        ))}
    </Paper>
  );
};

export default WorkshopsWidget;
