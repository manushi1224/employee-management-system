import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userContext from "../../context/userContext";
// import ApproveLeave from "../components/ApproveLeave";
import { Spin } from "antd";
import { AiFillFilter } from "react-icons/ai";
import { Button, Dropdown } from "react-bootstrap";
import { GrClear } from "react-icons/gr";

const AllLeaves = () => {
  const auth = useContext(userContext);
  const [sortedLeaves, setSortedLeaves] = useState([]);

  const getLeaveStatus = (status) => {
    switch (status) {
      case "rejected":
        return <span className="text-danger">Rejected</span>;
      case "approved":
        return <span className="text-success">Approved</span>;
      default:
        return <span>Pending</span>;
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      setSortedLeaves(auth.currentUser.leaveDate);
    }
  }, [auth.currentUser]);

  useEffect(() => {
    auth.getUserData();
    // eslint-disable-next-line
  }, []);

  const filterLeaveData = (status) => {
    if (auth.currentUser.leaveDate && sortedLeaves) {
      switch (status) {
        case "accepted":
          var sortedData = auth.currentUser.leaveDate.filter(
            (data) => data.leave_status === "approved"
          );
          setSortedLeaves(sortedData);
          break;
        case "rejected":
          var sortedRejected = auth.currentUser.leaveDate.filter(
            (data) => data.leave_status === "rejected"
          );
          setSortedLeaves(sortedRejected);
          break;
        case "pending":
          var sortedPending = auth.currentUser.leaveDate.filter(
            (data) => data.leave_status === "pending"
          );
          setSortedLeaves(sortedPending);
          break;
        default:
          setSortedLeaves(auth.currentUser.leaveDate);
          break;
      }
    }
  };

  // if (auth.isSuperUser) {
  //   return <ApproveLeave />;
  // }

  if (!auth.currentUser) {
    return <Spin fullscreen />;
  }

  return (
    <div>
      <div className="d-flex justify-content-center mt-4">
        <h2 className="profile-detail-heading">Leave Status and History</h2>
      </div>
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-3">
            <Button
              variant=""
              className="px-4 custom-button"
              onClick={() => filterLeaveData("all")}
            >
              <GrClear className="mb-1 me-2" />
              Clear All Filters
            </Button>
            <Dropdown id="dropdown-basic-button">
              <Dropdown.Toggle
                variant=""
                id="dropdown-basic"
                className="custom-button"
              >
                <AiFillFilter className="mb-1 me-2" />
                Filter
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => filterLeaveData("accepted")}>
                  Accepted
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filterLeaveData("rejected")}>
                  Rejected
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filterLeaveData("pending")}>
                  Pending
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            <Link to={`/ask-for-leave/${auth.userId}`}>
              <Button variant="" className="px-4 custom-button">
                + Ask For Leave
              </Button>
            </Link>
          </div>
        </div>
        <table className="table mt-4 rounded">
          <thead className="table-head">
            <tr>
              <th>No.</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedLeaves.length !== 0 ? (
              sortedLeaves.map((leave, index) => {
                return (
                  <tr key={leave._id}>
                    <td>{index + 1}</td>
                    <td>{leave.startDate}</td>
                    <td>{leave.leaveDate}</td>
                    <td>{getLeaveStatus(leave.leave_status)}</td>
                  </tr>
                );
              })
            ) : (
              <div className="d-flex justify-content-center">
                No Leave is Pending
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllLeaves;
