import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./User/pages/SignUp";
import Login from "./User/pages/Login";
import Dashboard from "./Dashboard/pages/Dashboard";
import MainNav from "./Navigation/MainNav";
import EditEmployee from "./User/pages/EditEmployee";
import { useCallback, useState } from "react";
import userContext from "./context/userContext";
import LeavePage from "./Dashboard/components/LeavePage";
import AllLeaves from "./Dashboard/pages/AllLeaves";
import axios from "axios";
import Profile from "./User/pages/Profile";
import { ConfigProvider } from "antd";

function App() {
  const getLocalItem = () => {
    return JSON.parse(localStorage.getItem("items"));
  };
  const isAuth = getLocalItem();
  const [session, setSession] = useState(isAuth || "");
  const [currentUser, setCurrentUser] = useState();
  const setLocalItem = (token, userId, superuser) => {
    localStorage.setItem(
      "items",
      JSON.stringify({
        token: token,
        userId: userId,
        isSuperUser: superuser,
      })
    );
    return true;
  };

  const login = useCallback((jwttoken, uid, superuser) => {
    setSession({
      token: jwttoken,
      userId: uid,
      isSuperUser: superuser,
    });
    setLocalItem(jwttoken, uid, superuser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("items");
    setSession({
      token: "",
      userId: "",
      isSuperUser: false,
    });
  }, []);

  const { token, userId, isSuperUser } = session;

  const getUserData = async () => {
    if (token) {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setCurrentUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelFontSize: 16,
          },
          Table: {
            cellFontSize: 15.5,
            cellPaddingInline: 12,
            headerBg: "#dfdfdf",
            headerColor: "#242424",
            headerSortActiveBg: "#999999",
            headerSortHoverBg	: "rgba(181, 181, 181, 0.94)",
          },
        },
      }}
    >
      <userContext.Provider
        value={{
          isLoggedIn: !!token,
          userId: userId,
          token: token,
          isSuperUser: isSuperUser,
          currentUser: currentUser,
          getUserData: getUserData,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          <MainNav />
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/leave-page" element={<AllLeaves />}></Route>
            <Route path="/ask-for-leave/:uid" element={<LeavePage />}></Route>
            <Route path="/edit/:uid" element={<EditEmployee />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </userContext.Provider>
    </ConfigProvider>
  );
}

export default App;
