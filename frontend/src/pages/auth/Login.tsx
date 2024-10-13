import { Button, Box, Typography, Card, CardContent } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import session from "../../api/sessions_manager";
import FormTextField from "../../components/FormTextField";

/* This page is for logging in a user */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuth } = useContext(session.SessionContext);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email && password) {
      session.actions.loginUser({ user: { email, password } }).then(() => {
        if (session.getters.isLoggedIn()) {
          setIsAuth(true);
          navigate("/");
        }
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          'url("https://www.singaporepsa.com/wp-content/uploads/2022/07/TiltShift_PP_2019_3-scaled-e1666939753382.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Card for the form */}
      <Card sx={{ width: "30vw", padding: 8, textAlign: "center", zIndex: 2 }}>
        <CardContent>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Typography variant="h4" mb={3}>
              Login Form
            </Typography>
            <FormTextField
              input={email}
              setInput={setEmail}
              type="email"
              label="Email"
            />
            <FormTextField
              input={password}
              setInput={setPassword}
              type="password"
              label="Password"
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: "100%", mt: 2 }} // Makes the button wider
            >
              Login
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, textDecoration: "underline", cursor: "pointer" }}
              onClick={() => navigate("/register")} // Navigate to register page
            >
              Dont have an account? Register
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
