import React, { useContext, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import userContext from "../../context/userContext";
import { CiMail } from "react-icons/ci";
import { MdGroupAdd } from "react-icons/md";

const Profile = () => {
  const auth = useContext(userContext);
  useEffect(() => {
    auth.getUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {auth.currentUser && (
        <>
          <Card
            style={{ width: "18rem" }}
            className="shadow-lg m-3 col-6 bg-dark"
          >
            <div className="d-flex justify-content-center mt-3">
              <Card.Img
                variant="top"
                src={`/${auth.currentUser.image}`}
                className="w-25 rounded-circle"
              />
            </div>

            <Card.Body className="p-3">
              <Card.Title className="text-center text-light">
                <h3>{auth.currentUser.name}</h3>
              </Card.Title>
              <ListGroup className="list-group-flush rounded">
                <ListGroup.Item variant="dark">
                  <span className="fw-bold">Position: </span>
                  {auth.currentUser.position}
                </ListGroup.Item>
                <ListGroup.Item>
                <MdGroupAdd  className="mb-1 me-2"/>
                  <span className="fw-bold">Joining Date: </span>
                  {auth.currentUser.joiningDate.split("T")[0]}
                </ListGroup.Item>
                <ListGroup.Item>
                <CiMail className="mb-1 me-2"/>
                  <span className="fw-bold">Email:&nbsp;</span>
                  {auth.currentUser.email}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};

export default Profile;
