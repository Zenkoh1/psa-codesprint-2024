import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Stack, CircularProgress } from "@mui/material";
import session from "./api/sessions_manager";

import Homepage from "./pages/Homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/Navbar";

import Workshops from "./pages/workshops/Workshops";
import WorkshopDetails from "./pages/workshops/WorkshopDetails";
import CreateWorkshop from "./pages/workshops/CreateWorkshop";
import Questionpage from "./pages/forum/Questionpage";
import PostQuestionpage from "./pages/forum/PostQuestionpage";
import Forumpage from "./pages/forum/Forumpage";
import Calendar from "./pages/calendar/Calendar";
import AdminDashboard from "./pages/AdminDashboard";
import RedirectToLogin from "./pages/RedirectToLogin";

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

  if (!isAuth) {
    return (
      <session.SessionContext.Provider value={{ isAuth, setIsAuth }}>
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<RedirectToLogin />} />
            </Routes>
          </BrowserRouter>
        </div>
      </session.SessionContext.Provider>
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
            <Route path="/forum" element={<Forumpage />} />
            <Route path="/question/:id" element={<Questionpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post_question" element={<PostQuestionpage />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/workshops/create" element={<CreateWorkshop />} />
            <Route path="/workshops/:id" element={<WorkshopDetails />} />
            <Route path="/calendar" element={<Calendar />} />
            {/* TODO: Add a guard to prevent non-admin users from accessing this route */}
            <Route path="/admin_dashboard" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </session.SessionContext.Provider>
  );
}

export default App;
