import React, { useEffect, useState } from "react";
import axios from "axios";

import { ListGroup } from "react-bootstrap";
import { Spin } from "antd";

import CardUI from "../../UI/CardUI";
import getIcon from "../../utils/getIcon";

const ApproveLeave = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [updateLeave, setUpdateLeave] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://employee-management-system-ujnj.onrender.com/api/leaves/applied-leave/");
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
      await axios.patch(`https://employee-management-system-ujnj.onrender.com/api/leaves/approve-leave/${leaveId}`, {
        applyForLeave: permission,
      });
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
            <div className="d-flex justify-content-center" key={emp._id}>
              <CardUI
                image={emp.image}
                title={emp.name}
                width="50%"
                center={false}
                imgSize={50}
              >
                <ListGroup className="list-group-flush rounded mb-2">
                  <ListGroup.Item variant="danger" className="w-full">
                    <span className="fw-bold">Applied for leave</span>
                  </ListGroup.Item>
                  {emp.leaveDate.map((leave) => {
                    if (leave.leave_status === "pending") {
                      return (
                        <div className="d-flex flex-row" key={leave._id}>
                          <ListGroup.Item className="w-100">
                            <span className="fw-bold">
                              From: {leave.startDate}
                            </span>
                          </ListGroup.Item>
                          <ListGroup.Item className="w-100">
                            <span className="fw-bold">
                              To: {leave.leaveDate}
                            </span>
                          </ListGroup.Item>
                          <ListGroup.Item className="w-75">
                            <div
                              className="me-2 text-success fw-bold"
                              onClick={() => leaveApproval(true, leave._id)}
                            >
                              {getIcon("check")}
                              Approve
                            </div>
                            <div
                              className="text-danger fw-bold"
                              onClick={() => leaveApproval(false, leave._id)}
                            >
                              {getIcon("reject")}
                              Disapprove
                            </div>
                          </ListGroup.Item>
                        </div>
                      );
                    }
                    return null;
                  })}
                </ListGroup>
              </CardUI>
            </div>
          );
        })
      )}
    </>
  );
};

export default ApproveLeave;
