import React from "react";
import { Spin } from "antd";
import { ListGroup } from "react-bootstrap";
import CardUI from "../../UI/CardUI";
import getIcon from "../../utils/getIcon";
import "../pages/Profile.css"

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
          <h3 className="text-center mb-4 profile-detail-heading">
            {getIcon("share")}
            Social Profiles
          </h3>
          <ListGroup variant="flush">
            <ListGroupItem name={props.user.email} title="Email" icon="email" />
            <ListGroupItem
              name={props.user.linkedInId}
              title="LinkedIn"
              icon="linkedIn"
            />
            <ListGroupItem
              name={props.user.githubId}
              title="Github ID"
              icon="githubId"
            />
            <ListGroupItem
              name={props.user.joiningDate.split("T")[0]}
              title="Joining Date"
              icon="joiningDate"
            />
            <ListGroupItem
              name={props.user.phone}
              title="Phone Number"
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
