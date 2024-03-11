import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/pages/Dashboard";
import MainNav from "./Navigation/MainNav";
import EditEmployee from "./User/pages/EditEmployee";
import { useCallback, useState } from "react";
import userContext from "./context/userContext";
import LeavePage from "./Dashboard/components/LeavePage";
import ApproveLeave from "./Dashboard/components/ApproveLeave";
import AllLeaves from "./Dashboard/pages/AllLeaves";
import axios from "axios";
import Profile from "./UserProfile/pages/Profile";
import { ConfigProvider } from "antd";
import NewUser from "./User/pages/NewUser";
import LoginUser from "./User/pages/LoginUser";
import NotFound from "./NotFound";

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
        const response = await axios.get(`https://employee-management-system-ujnj.onrender.com/api/users/${userId}`);
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
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/login" element={<LoginUser />}></Route>
            <Route path="/signup" element={<NewUser />}></Route>
            <Route path="/leave-page" element={<AllLeaves />}></Route>
            <Route path="/ask-for-leave/:uid" element={<LeavePage />}></Route>
            <Route path="/edit/:uid" element={<EditEmployee />} />
            <Route path="/profile/:uid" element={<Profile />} />
            <Route path="/approve-leave" element={<ApproveLeave /> }/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </userContext.Provider>
    </ConfigProvider>
  );
}

export default App;
