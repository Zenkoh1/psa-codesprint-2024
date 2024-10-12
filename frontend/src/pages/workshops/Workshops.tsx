import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  InputAdornment,
  Stack,
  TextField,
  Grid,
  Typography,
  Divider,
  Fab,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import WorkshopType from "../../types/Workshop.type";
import useAPI from "../../api/useAPI";
import session from "../../api/sessions_manager";

const WorkshopsPage = () => {
  const {
    fetchAPI: fetchWorkshops,
    loading: loadingWorkshops,
    data: workshops,
  } = useAPI<Array<WorkshopType>>("/api/v1/workshops");

  const [filteredData, setFilteredData] = useState<Array<WorkshopType>>();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkshops();
  }, []);

  // Trigger filtering when the search params change
  useEffect(() => {
    filterWorkshops();
  }, [searchParams, workshops]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filterValue = searchRef.current?.value || "";
    setSearchParams({ q: filterValue });
  };

  // Filter workshops based on the search query (title), and sort by time
  const filterWorkshops = () => {
    const searchFilter = searchParams.get("q") || "";

    const newData = workshops
      ?.filter((workshop) =>
        workshop.title.toLowerCase().includes(searchFilter.toLowerCase()),
      )
      .sort(
        (a: WorkshopType, b: WorkshopType) =>
          new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
      );
    setFilteredData(newData);
  };

  const handleCardClick = (id: number) => {
    navigate(`/workshops/${id}`);
  };

  const getWorkshopComponents = (filteredData: Array<WorkshopType>) => {
    if (filteredData.length === 0) {
      return <Box py={2}>No workshops found</Box>;
    }

    return filteredData.map((workshop) => (
      <Grid item xs={12} sm={6} md={4} key={workshop.id}>
        <Card
          onClick={() => handleCardClick(workshop.id)}
          sx={{
            cursor: "pointer",
            transition:
              "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: 3,
            },
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {workshop.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {workshop.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={2}>
              <strong>Start date:</strong> {workshop.start_time.toString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>End date:</strong> {workshop.end_time.toString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Venue:</strong> {workshop.venue}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <Box sx={{ py: 5, px: 30 }}>
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          inputRef={searchRef}
          InputProps={{
            sx: { borderRadius: 5 },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          placeholder="Search workshops..."
          size="small"
        />
      </form>
      {loadingWorkshops && <p> Loading workshops ... </p>}
      {!loadingWorkshops && (
        <Stack
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={3}
        >
          <Grid container spacing={3}>
            {getWorkshopComponents(filteredData || [])}
          </Grid>
        </Stack>
      )}
      {session.getters.getUser().admin && (
        <Fab
          color="primary"
          onClick={() => navigate("/workshops/create")}
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
};

export default WorkshopsPage;
