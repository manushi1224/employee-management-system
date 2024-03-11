import React from "react";
import {getLeaveData} from "../utils/leaveFunctions";
import userOnLeave from "../utils/isOnLeave";
import { Avatar } from "antd";

import "./LeaveUI.css";
import getIcon from "../utils/getIcon";
import { Link } from "react-router-dom";

const LeaveUI = ({ employee, superuser }) => {
  const leaveUsers = userOnLeave(employee);

  if (superuser) {
    return (
      <div className="container leave-section">
        <div className="d-flex justify-content-between sticky-head">
          <h3>Pending Approval</h3>
          <Link to={"/approve-leave"} className="text-decoration-none mt-1">
            <span className="leave-req">Leave Requests &gt;</span>
          </Link>
        </div>
        {employee.map((emp) => {
          if (getLeaveData(emp.leaveDate) > 0) {
            return (
              <div
                key={emp._id}
                className="d-flex justify-content-between mt-2"
              >
                <div className="d-flex gap-4">
                  <Avatar src={`https://employee-management-system-ujnj.onrender.com/${emp.image}`} size={30} />
                  <span className="leave-text">{emp.name}</span>
                </div>
                <span className="leave-text">
                  {getLeaveData(emp.leaveDate)}
                </span>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }

  return (
    <div className="leave-section">
      <h3>On Leave</h3>
      {leaveUsers.map((user, index) => {
        return (
          <div key={index} className="d-flex justify-content-between mt-3">
            <Avatar src={`https://employee-management-system-ujnj.onrender.com/${user.image}`} size={25} />
            <div>{user.name}</div>
            <div>{user.startDate}</div>
            <div>{getIcon("right-arrow")}</div>
            <div>{user.endDate}</div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaveUI;
