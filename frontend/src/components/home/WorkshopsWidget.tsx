import { CardContent, Paper, Typography, Card } from "@mui/material";
import WorkshopType from "../../types/Workshop.type";
import { useNavigate } from "react-router-dom";
import useAPI from "../../api/useAPI";
import { useEffect } from "react";

const WorkshopCard = ({ workshop }: { workshop: WorkshopType }) => {
  const navigate = useNavigate();

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
      onClick={() => navigate(`/workshops/${workshop.id}`)}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {workshop.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Date:</strong> {workshop.start_time.getDate().toString()}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Location:</strong> {workshop.venue}
        </Typography>
      </CardContent>
    </Card>
  );
};

const WorkshopsWidget = () => {
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
            a.start_time.getTime() - b.start_time.getTime(),
        )
        .slice(0, 2)
        .map((workshop: WorkshopType) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))}
    </Paper>
  );
};

export default WorkshopsWidget;
