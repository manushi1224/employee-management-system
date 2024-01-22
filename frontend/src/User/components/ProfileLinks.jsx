import React from "react";
import { Spin } from "antd";
import { ListGroup } from "react-bootstrap";
import { FaLinkedin, FaUserPlus, FaMailBulk } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import CardUI from "../../UI/CardUI";

const getIcon = (icon) => {
  switch (icon) {
    case "email":
      return <FaMailBulk className="mb-1 me-2" />;
    case "linkedIn":
      return <FaLinkedin className="mb-1 me-2" />;
    case "joiningDate":
      return <FaUserPlus className="mb-1 me-2" />;
  }
};

const ListGroupItem = (props) => {
  return (
    <ListGroup.Item>
      <span className="d-flex justify-content-between align-items-start">
        <span className="fw-bold">
          {getIcon(props.icon)}
          {props.title}
        </span>
        <span>{props.name}</span>
      </span>
    </ListGroup.Item>
  );
};

const ProfileLinks = (props) => {
  return (
    <CardUI>
      {props.user ? (
        <div className="d-flex flex-column">
          <h4 className="text-center mb-4">
            <IoShareSocialSharp className="mb-1 me-3" />
            Social Profiles
          </h4>
          <ListGroup variant="flush">
            <ListGroupItem name={props.user.email} title="Email" icon="email" />
            <ListGroupItem
              name={props.user.linkedInId}
              title="LinkedIn"
              icon="linkedIn"
            />
            <ListGroupItem
              name={props.user.joiningDate.split("T")[0]}
              title="Joining Date"
              icon="joiningDate"
            />
          </ListGroup>
        </div>
      ) : (
        <Spin />
      )}
    </CardUI>
  );
};

export default ProfileLinks;
