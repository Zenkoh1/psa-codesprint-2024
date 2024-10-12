import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  Link,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link as RouterLink } from "react-router-dom";
import useAPI from "../../api/useAPI";
import WorkshopType from "../../types/Workshop.type";
import { useEffect, useState } from "react";
import UserType from "../../types/User.type";
import session from "../../api/sessions_manager";

const WorkshopDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  const {
    fetchAPI: fetchWorkshop,
    loading: loadingWorkshop,
    data: workshop,
  } = useAPI<WorkshopType>(`/api/v1/workshops/${id}`);

  const {
    fetchAPI: fetchRegisterStatus,
    loading: loadingRegisterStatus,
    data: registerStatus,
  } = useAPI<boolean>(`/api/v1/workshops/${id}/registration_status`);

  const {
    fetchAPI: fetchRegisteredUsers,
    loading: loadingRegisteredUsers,
    data: registeredUsers,
  } = useAPI<Array<UserType>>(`/api/v1/workshops/${id}/registered_users`);

  const { fetchAPI: deleteWorkshop } = useAPI(`/api/v1/workshops/${id}`, {
    method: "DELETE",
  });

  const { fetchAPI: registerWorkshopAPI } = useAPI(
    `/api/v1/workshops/${id}/register`,
    {
      method: "POST",
    },
  );

  useEffect(() => {
    fetchWorkshop();
    fetchRegisterStatus();
    if (session.getters.getUser().admin) fetchRegisteredUsers();
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

  const handleDelete = () => {
    deleteWorkshop()
      .then(() => {
        alert("Workshop deleted successfully!");
        navigate("/workshops");
      })
      .catch(() => {
        alert("Error deleting workshop");
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
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link
          component={RouterLink}
          to="/workshops"
          underline="hover"
          color="inherit"
        >
          All Workshops
        </Link>
        <Typography color="textPrimary">{workshop.title}</Typography>
      </Breadcrumbs>

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
        disabled={loadingRegisterStatus || !!registerStatus}
      >
        {loadingRegisterStatus && "Loading..."}
        {!loadingRegisterStatus && registerStatus && "Registered"}
        {!loadingRegisterStatus && !registerStatus && "Register"}
      </Button>

      {session.getters.getUser().admin && (
        <Box mt={5}>
          <Typography variant="h5">Registered Users</Typography>
          {loadingRegisteredUsers && <Box>Loading...</Box>}
          {registeredUsers && (
            <Box>
              {registeredUsers.map((user) => (
                <Box key={user.id}>{user.username}</Box>
              ))}
            </Box>
          )}
        </Box>
      )}

      {session.getters.getUser().admin && (
        <Fab
          color="secondary"
          aria-label="delete"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={() => setDeleteDialogOpen(true)}
        >
          <DeleteIcon />
        </Fab>
      )}

      {deleteDialogOpen && (
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete Workshop</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this workshop?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              color="secondary"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default WorkshopDetails;
