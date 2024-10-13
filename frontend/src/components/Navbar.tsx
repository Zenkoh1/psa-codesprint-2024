import { Link as RouterLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { School, Chat, Event, SupervisorAccount } from "@mui/icons-material";
import session from "../api/sessions_manager";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(session.SessionContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setAnchorEl(null);
  }, []);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Open the dropdown menu
  };

  return (
    <AppBar position="static" elevation={0} color="secondary">
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
          <Stack spacing={2} direction="row">
            {isAuth && (
              <>
                <IconButton component={RouterLink} to="/workshops">
                  <School />
                </IconButton>
                <IconButton component={RouterLink} to="/forum">
                  <Chat />
                </IconButton>
                <IconButton component={RouterLink} to="/calendar">
                  <Event />
                </IconButton>
              </>
            )}
            {isAuth && session.getters.getUser().admin && (
              <IconButton component={RouterLink} to="/admin_dashboard">
                <SupervisorAccount />
              </IconButton>
            )}
          </Stack>
          {/*isAuth && (
            <Typography variant="h6">
              Welcome {session.getters.getUser().username}!
            </Typography>
          )*/}
        </Stack>
        <div>
          {isAuth && (
            <Stack spacing={2} direction="row">
              <Avatar
                sx={{
                  fontSize: 20,
                  width: 35,
                  height: 35,
                  bgcolor: "primary.main",
                }}
                onClick={handleAvatarClick}
              >
                {session.getters.getUser().username.at(0)}
              </Avatar>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem
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
                </MenuItem>
              </Menu>
            </Stack>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
