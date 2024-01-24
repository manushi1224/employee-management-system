import React, { useContext } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
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
          <CardUI width="18rem" title={emp.name} image={emp.image}>
            <ListGroup className="list-group-flush rounded">
              <ListGroup.Item variant="dark">
                <span className="fw-bold">Position: </span>
                {emp.position}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="fw-bold">Joining Date: </span>
                {emp.joiningDate.split("T")[0]}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="fw-bold">Leave Status: </span>
                {isOnLeave(emp.leaveDate, Date.now()) ? (
                  <span className="text-danger fw-bold">On Leave</span>
                ) : (
                  <span className="text-success fw-bold">Available</span>
                )}
              </ListGroup.Item>
            </ListGroup>
            {/* <Card.Footer>
              {authUser.isSuperUser ? (
                <Link to={`/edit/${emp._id}`}>
                  <Button className="bg-white border-white text-dark mt-3">
                    Edit Info
                  </Button>
                </Link>
              ) : (
                authUser.userId === emp._id && (
                  <>
                    <Link to={`/edit/${emp._id}`}>
                      <Button className="bg-white border-white text-dark mt-3">
                        Edit Info
                      </Button>
                    </Link>
                    <Link to={`/ask-for-leave/${emp._id}`}>
                      <Button className="bg-white border-white text-dark mt-3 ms-3">
                        Ask For Leave
                      </Button>
                    </Link>
                  </>
                )
              )}
            </Card.Footer> */}
          </CardUI>
        );
      })}
    </div>
  );
};

export default EmpList;
