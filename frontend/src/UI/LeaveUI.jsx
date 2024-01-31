import React from "react";
import getLeaveData from "../utils/getLeaveData";
import userOnLeave from "../utils/isOnLeave";

const LeaveUI = ({ employee, superuser }) => {
  const leaveUsers = userOnLeave(employee);

  if (superuser) {
    return (
      <div className="container">
        <div className="d-flex justify-content-between">
          <h5>Pending Approval</h5>
          <span>Leave Request &gt;</span>
        </div>
        {employee.map((emp) => {
          if (getLeaveData(emp.leaveDate) > 0) {
            return (
              <div key={emp._id} className="d-flex justify-content-between">
                <span>{emp.name}</span>
                <span>{getLeaveData(emp.leaveDate)}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }

  return (
    <div>
      <h3>On Leave</h3>
      {leaveUsers.map((user, index) => {
        return (
          <div key={index} className="d-flex justify-content-between">
            <div>{user.name}</div>
            <div>{user.startDate}</div>
            <div>{user.endDate}</div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaveUI;
