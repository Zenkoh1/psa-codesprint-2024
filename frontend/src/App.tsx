import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Stack, CircularProgress } from "@mui/material";
import session from "./api/sessions_manager";

import Homepage from "./pages/Homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Workshops from "./pages/workshops/Workshops";
import WorkshopDetails from "./pages/workshops/WorkshopDetails";
import Navbar from "./components/Navbar";

/* Check if JWT_Token is stored and attempt to log the user in with that token */
async function authenticate(): Promise<boolean> {
  const cookiesExists =
    localStorage.auth_token !== null && localStorage.auth_token !== undefined;

  if (cookiesExists) {
    const auth_token = localStorage.getItem("auth_token");
    const authTokenExists = auth_token !== null && auth_token !== undefined;

    if (authTokenExists) {
      try {
        await session.actions.loginUserWithToken(auth_token);
        return true;
      } catch (error) {
        return false;
      }
    }
  }
  return false;
}

function App() {
  useEffect(() => {
    document.title = "CodeSprint - [app name]";
  }, []);

  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    authenticate().then((val) => {
      setUserInfoLoaded(true);
      setIsAuth(val);
    });
  }, []);

  if (!userInfoLoaded) {
    return (
      <Stack alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    /* Provider exposes whether or not the user is authenticated to the application*/
    <session.SessionContext.Provider value={{ isAuth, setIsAuth }}>
      <div className="App">
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Homepage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/workshops" element={<Workshops />} />
            <Route path="/workshops/:id" element={<WorkshopDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
    </session.SessionContext.Provider>
  );
}

export default App;
