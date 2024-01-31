import React, { useContext, useEffect, useState } from "react";
import EmpList from "../../User/components/EmpList";
import axios from "axios";
import EmpTable from "../components/EmpTable";
import CardUI from "../../UI/CardUI";
import userContext from "../../context/userContext";
import "./Dashboard.css";
import LeaveUI from "../../UI/LeaveUI";
import WelcomeUI from "../../UI/WelcomeUI";

const Dashboard = () => {
  const [employee, setEmployee] = useState([]);
  const authUser = useContext(userContext);

  useEffect(() => {
    const getEmployeeDetails = async () => {
      try {
        const response = await axios.get(`/api/users/`);
        setEmployee(response.data.user);
      } catch (error) {
        console.log("error is:", error);
      }
    };
    getEmployeeDetails();
    authUser.getUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="dashboard-section">
      <div className="welcome-section">
        <CardUI width="w-100">
          <WelcomeUI employee={authUser.currentUser}/>
        </CardUI>
      </div>
      <div className="leave-brief">
        <CardUI>
          <LeaveUI employee={employee} superuser={authUser.isSuperUser}/>
        </CardUI>
      </div>
      <div className="container-fluid employee-section">
        <div className="row">
          <div className="col-lg-4 col-md-5">
            <EmpTable employee={employee} />
          </div>
          <div className="col-lg-8 col-md-7">
            <EmpList employee={employee} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
