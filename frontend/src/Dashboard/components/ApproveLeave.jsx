import { Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

const ApproveLeave = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [updateLeave, setUpdateLeave] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `/api/leaves/applied-leave/`
        );
        setUser(response.data.user);
        setUpdateLeave(false);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
      setLoading(false);
    };
    fetchUser();
  }, [updateLeave]);

  const leaveApproval = async (permission, leaveId) => {
    try {
      await axios.patch(
        `/api/leaves/approve-leave/${leaveId}`,
        { applyForLeave: permission }
      );
      setUpdateLeave(true);
      setLoading(true);
    } catch (error) {
      console.log(error);
      setUpdateLeave(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spin fullscreen />
      ) : (
        user.map((emp) => {
          return (
            <div className="d-flex row justify-content-center" key={emp._id}>
              <Card className="shadow-lg m-3 w-50 bg-dark text-white">
                <div className="d-flex justify-content-center mt-3">
                  <Card.Img
                    variant="top"
                    src={`/${emp.image}`}
                    className="w-25 rounded-circle"
                  />
                </div>
                <Card.Body>
                  <Card.Title className="text-center text-white">
                    {emp.name}
                  </Card.Title>
                  <div className="d-flex row">
                    {emp.leaveDate.map((leave) => {
                      if (leave.leave_status === "pending") {
                        return (
                          <ListGroup
                            className="list-group-flush rounded w-50 mb-2"
                            key={leave._id}
                          >
                            <ListGroup.Item variant="danger">
                              <span className="fw-bold">Applied for leave</span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <span className="fw-bold">
                                From: {leave.startDate}
                              </span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <span className="fw-bold">
                                To: {leave.leaveDate}
                              </span>
                            </ListGroup.Item>
                            <div className="d-flex">
                              <Button
                                variant="success"
                                className="mt-3 me-2 w-50"
                                onClick={() => leaveApproval(true, leave._id)}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="danger"
                                className="mt-3 ms-2 w-50"
                                onClick={() => leaveApproval(false, leave._id)}
                              >
                                Dissapprove
                              </Button>
                            </div>
                          </ListGroup>
                        );
                      }
                      return null;
                    })}
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })
      )}
    </>
  );
};

export default ApproveLeave;
