import { CardContent, Paper, Typography, Card } from "@mui/material";
import WorkshopType from "../../types/Workshop.type";
import { useNavigate } from "react-router-dom";
import useAPI from "../../api/useAPI";
import { useEffect } from "react";

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
          <strong>Date:</strong>{" "}
          {new Date(workshop.start_time).getDate().toString()}
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
      <Typography variant="h6" gutterBottom>
        Upcoming Workshops
      </Typography>
      {loadingWorkshops && <p>Loading workshops</p>}
      {workshops
        ?.sort(
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
