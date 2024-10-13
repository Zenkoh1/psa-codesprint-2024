import { Button, Box, Typography, Card, CardContent } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import session from "../../api/sessions_manager";
import FormTextField from "../../components/FormTextField";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const { setIsAuth } = useContext(session.SessionContext);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    if (email && password) {
      session.actions
        .registerUser({
          user: { email, password, username, job_description: jobTitle },
        })
        .then(() => {
          if (session.getters.isLoggedIn()) {
            navigate("/");
            setIsAuth(true);
          }
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 64px)",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          'url("https://www.singaporepsa.com/wp-content/uploads/2022/07/TiltShift_PP_2019_3-scaled-e1666939753382.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card sx={{ width: "30vw", px: 8, py: 4, textAlign: "center", my: 2 }}>
        <CardContent>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Typography variant="h4" mb={3}>
              Registration Form
            </Typography>
            <FormTextField
              input={username}
              setInput={setUsername}
              label="Username"
            />
            <FormTextField
              input={email}
              setInput={setEmail}
              type="email"
              label="Email"
            />
            <FormTextField
              input={jobTitle}
              setInput={setJobTitle}
              label="Job Title"
            />
            <FormTextField
              input={password}
              setInput={setPassword}
              type="password"
              label="Password"
            />
            <FormTextField
              input={confirmPassword}
              setInput={setConfirmPassword}
              type="password"
              label="Confirm Password"
              error={confirmPasswordError !== ""}
              helperText={confirmPasswordError}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: "100%", mt: 2 }} // Makes the button wider
            >
              Register
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, textDecoration: "underline", cursor: "pointer" }}
              onClick={() => navigate("/login")} // Navigate to login page
            >
              Already have an account? Login
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
