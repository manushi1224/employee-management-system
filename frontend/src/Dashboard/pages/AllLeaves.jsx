import React, { useContext, useEffect, useState } from "react";
import userContext from "../../context/userContext";
import ApproveLeave from "../components/ApproveLeave";
import { Spin } from "antd";
import { AiFillFilter } from "react-icons/ai";
import { Table, Button, Dropdown } from "react-bootstrap";
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

  if (auth.isSuperUser) {
    return <ApproveLeave />;
  }

  if (!auth.currentUser) {
    return <Spin fullscreen />;
  }

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h2>Leave Status and History</h2>
      </div>
      <div className="container">
        <div className="d-flex gap-3">
          <Button
            variant=""
            className="border px-4"
            onClick={() => filterLeaveData("all")}
          >
            <GrClear className="mb-1 me-2" />
            Clear All Filters
          </Button>
          <Dropdown id="dropdown-basic-button">
            <Dropdown.Toggle variant="" id="dropdown-basic" className="border">
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
        <Table striped>
          <thead className="bg-dark text-white">
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
        </Table>
      </div>
    </div>
  );
};

export default AllLeaves;
