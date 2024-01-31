import React, { useContext } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import userContext from "../../context/userContext";
import CardUI from "../../UI/CardUI";

const EmpList = (props) => {
  const authUser = useContext(userContext);

  const isOnLeave = (D1, D3) => {
    D3 = new Date(D3);
    let isOnLeave = false;
    for (const d in D1) {
      const startDate = new Date(D1[d].startDate);
      const endDate = new Date(D1[d].leaveDate);
      if (
        D3.getTime() <= endDate.getTime() &&
        D3.getTime() >= startDate.getTime()
      ) {
        isOnLeave = true;
        break;
      }
    }
    return isOnLeave;
  };

  return (
    <div className="d-flex row justify-content-center">
      {props.employee.map((emp) => {
        return (
          <CardUI
            width="18rem"
            title={emp.name}
            image={emp.image}
            key={emp._id}
            center={true}
          >
            <ListGroup className="list-group-flush rounded mt-4">
              <ListGroup.Item variant="dark">
                <span className="fw-bold">Position: </span>
                {emp.position}
              </ListGroup.Item>
              {/* <ListGroup.Item>
                <span className="fw-bold">Joining Date: </span>
                {emp.joiningDate.split("T")[0]}
              </ListGroup.Item> */}
              {/* <ListGroup.Item>
                <span className="fw-bold">Leave Status: </span>
                {isOnLeave(emp.leaveDate, Date.now()) ? (
                  <span className="text-danger fw-bold">On Leave</span>
                ) : (
                  <span className="text-success fw-bold">Available</span>
                )}
              </ListGroup.Item> */}
              {/* <Button
                className="mt-3 ms-3"
                variant="dark"
                disabled={authUser.userId !== emp._id}
              >
                <Link
                  to={`/ask-for-leave/${emp._id}`}
                  className="text-decoration-none text-light"
                >
                  Ask For Leave
                </Link>
              </Button> */}
            </ListGroup>
          </CardUI>
        );
      })}
    </div>
  );
};

export default EmpList;
