import { Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import session from "../api/sessions_manager";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(session.SessionContext);

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Typography
            sx={{ textDecoration: "none", fontWeight: "bold" }}
            variant="h5"
            color="inherit"
            component={RouterLink}
            to="/"
          >
            <img
              src="https://www.singaporepsa.com/wp-content/uploads/2023/03/psa-singapore-logo-copy.png"
              style={{ height: "20px" }}
            />
          </Typography>
          {isAuth && (
            <Typography variant="h6">
              Welcome {session.getters.getUser().username}!
            </Typography>
          )}
        </Stack>
        <div>
          {!isAuth ? (
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                color="secondary"
                component={RouterLink}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={RouterLink}
                to="/register"
              >
                Register
              </Button>
            </Stack>
          ) : (
            <Stack spacing={2} direction="row">
              {session.getters.getUser().admin && (
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/admin_dashboard"
                >
                  Admin Dashboard
                </Button>
              )}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  session.actions
                    .logoutUser()
                    .then(() => setIsAuth(false))
                    .catch(() => {
                      alert("Error logging out, refresh the page!");
                    });
                }}
              >
                Logout
              </Button>
            </Stack>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
