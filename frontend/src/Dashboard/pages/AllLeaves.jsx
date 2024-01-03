import React, { useContext, useEffect } from "react";
import userContext from "../../context/userContext";
import ApproveLeave from "../components/ApproveLeave";
import { Spin } from "antd";
import { Card, ListGroup } from "react-bootstrap";

const AllLeaves = () => {
  const auth = useContext(userContext);

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
    auth.getUserData();
  }, [auth]);

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
      <div className="d-flex justify-content-center row">
        {auth.currentUser &&
          auth.currentUser.leaveDate.map((leave) => {
            return (
              <Card
                key={leave._id}
                style={{ width: "20rem" }}
                className="shadow-lg m-3 bg-dark"
              >
                <Card.Body>
                  <Card.Title className="text-center text-white"></Card.Title>
                  <ListGroup className="list-group-flush rounded">
                    <ListGroup.Item variant="dark" className="fw-bold">
                      <span>Status : </span>
                      {getLeaveStatus(leave.leave_status)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="fw-bold">Start Date :</span>
                      {leave.startDate}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="fw-bold">Leave End Date :</span>
                      {leave.leaveDate}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default AllLeaves;
