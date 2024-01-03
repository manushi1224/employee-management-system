import React, { useEffect, useState } from "react";
import EmpList from "../../User/components/EmpList";
import axios from "axios";
import EmpTable from "../components/EmpTable";

const Dashboard = () => {
  const [employee, setEmployee] = useState([]);

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
  }, []);

  return (
    <>
      <h2 className="text-center mt-4">Current Employees</h2>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-5">
            <EmpTable employee={employee} />
          </div>
          <div className="col-lg-8 col-md-7">
            <EmpList employee={employee} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
