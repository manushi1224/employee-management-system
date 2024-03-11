import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import EmpList from "../../User/components/EmpList";
import EmpTable from "../components/EmpTable";
import userContext from "../../context/userContext";
import CardUI from "../../UI/CardUI";
import LeaveUI from "../../UI/LeaveUI";
import WelcomeUI from "../../UI/WelcomeUI";

import { Spin } from "antd";

const Dashboard = () => {
  const [employee, setEmployee] = useState([]);
  const authUser = useContext(userContext);

  useEffect(() => {
    const getEmployeeDetails = async () => {
      try {
        const response = await axios.get(`https://employee-management-system-ujnj.onrender.com/api/users/`);
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
    <>
      {employee && authUser.currentUser ? (
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <CardUI width="w-100">
                <WelcomeUI employee={authUser.currentUser} />
              </CardUI>
            </div>
            <div className="col-lg-4 col-md-12">
              <CardUI>
                <LeaveUI employee={employee} superuser={authUser.isSuperUser} />
              </CardUI>
            </div>
          </div>

          <div className="container-fluid">
            <div className="d-flex justify-content-end me-4 mb-3">
              {authUser.isSuperUser && (
                <Link to={"/signup"}>
                  <Button varient="" className="custom-button bg-white mt-3">
                    + Add a New Employee
                  </Button>
                </Link>
              )}
            </div>
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
      ) : (
        <Spin fullscreen></Spin>
      )}
    </>
  );
};

export default Dashboard;
