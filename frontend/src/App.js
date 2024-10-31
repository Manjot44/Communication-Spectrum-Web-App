import React from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import EnterAccDetails from './pages/EnterAccDetails';
import UserManage from './pages/UserManage';
import EnterUserDetails from './pages/EnterUserDetails';
import Gallery from './pages/Gallery';
import TaskAnalyses from './pages/TaskAnalyses.jsx';
import DailySchedules from './pages/DailySchedules.jsx';
import WeeklyCalendars from './pages/WeeklyCalendars.jsx';
import SocialStories from './pages/SocialStories.jsx';
import EnvironmentalSupports from './pages/EnvironmentalSupports.jsx';
import ChoiceBoards from './pages/ChoiceBoards.jsx';
import FirstThen from './pages/FirstThen.jsx';
import CreateTaskAnalysesScratch from './pages/CreateTaskAnalysesScratch.jsx';
import CreateChoiceBoard from './pages/CreateChoiceBoard.jsx';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// ProtectedRoute component to handle route protection
const ProtectedRoute = ({
  element: Component,
  isAuth,
  token,
  setTokenFunc,
}) => {
  if (isAuth === null) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to="/" />;
  return <Component token={token} setTokenFunc={setTokenFunc} />;
};

function App() {
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [isAuth, setIsAuth] = React.useState(null);

  const updateToken = async (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    const authStatus = await isAuthenticated();
    setIsAuth(authStatus);
  };

  const isAuthenticated = async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return false;
    try {
      const response = await axios.get("http://localhost:5005/authenticate", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      return response.data.authenticated;
    } catch (error) {
      localStorage.removeItem("token");
      return false;
    }
  };

  // Check authentication status on app load
  React.useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setIsAuth(authStatus);
    };
    checkAuth();
  }, []);

  // Show a loading state while checking authentication
  if (isAuth === null) return <div>Loading...</div>;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setTokenFunc={updateToken} />} /> {/* First screen person will go to is login */}
          <Route path="/register" element={<Register setTokenFunc={updateToken} />} />
          <Route path="/home/:profileID" element={<ProtectedRoute element={Home} isAuth={isAuth} token={token} setTokenFunc={updateToken} />} />
          <Route path="/enterAccDetails" element={<ProtectedRoute element={EnterAccDetails} isAuth={isAuth} token={token} setTokenFunc={updateToken} />} />
          <Route path="/UserManage" element={<ProtectedRoute element={UserManage} isAuth={isAuth} token={token} setTokenFunc={updateToken} />} />
          <Route path="/AddUser" element={<ProtectedRoute element={EnterUserDetails} isAuth={isAuth} token={token} setTokenFunc={updateToken} />} />
          <Route path="/Gallery/:profileID" element={<ProtectedRoute element={Gallery} isAuth={isAuth} token={token} setTokenFunc={updateToken} />} />
          <Route path="/taskanalyses/:profileID" element={<ProtectedRoute element={TaskAnalyses} isAuth={isAuth} token={token} setTokenFunc={updateToken} />} />
          <Route path="/dailyschedules/:profileID" element={<ProtectedRoute element={DailySchedules} isAuth={isAuth} token={token} setTokenFunc={updateToken} />} />
          <Route path="/weeklycalendars/:profileID" element={<ProtectedRoute element={WeeklyCalendars} isAuth={isAuth} token={token} setTokenFunc={updateToken} />} />
          <Route path="/socialstories/:profileID" element={<ProtectedRoute element={SocialStories} isAuth={isAuth} token={token} setTokenFunc={updateToken} />} />
          <Route path="/envirsupports/:profileID" element={<ProtectedRoute element={EnvironmentalSupports} isAuth={isAuth} token={token} setTokenFunc={updateToken} />} />
          <Route path="/choiceboards/:profileID" element={<ProtectedRoute element={ChoiceBoards} isAuth={isAuth} token={token} setTokenFunc={updateToken} />} />
          <Route path="/createChoiceBoard/:profileID" element={<ProtectedRoute element={CreateChoiceBoard} isAuth={isAuth} token={token} setTokenFunc={updateToken} />} />
          <Route path="/firstthen/:profileID" element={<ProtectedRoute element={FirstThen} isAuth={isAuth} token={token} setTokenFunc={updateToken} />} />
          <Route path="/createTaskAnalyses/:profileID" element={<ProtectedRoute element={CreateTaskAnalysesScratch} isAuth={isAuth} token={token} setTokenFunc={updateToken} />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
