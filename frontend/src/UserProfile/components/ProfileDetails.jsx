import React from "react";
import CardUI from "../../UI/CardUI";
import { ListGroup } from "react-bootstrap";
import { Spin } from "antd";
import ChartUI from "../../UI/ChartUI";
import "../pages/Profile.css";
import getIcon from "../../utils/getIcon";

const ListGroupItem = (props) => {
  return (
    <ListGroup.Item>
      <span className="d-flex justify-content-between align-items-start">
        <span className="fw-bold">{props.title}</span>
        <span>{props.value}</span>
      </span>
    </ListGroup.Item>
  );
};

const ProfileDetails = (props) => {
  return props.user ? (
    <CardUI width="100%">
      <h3 className="text-center mb-4 profile-detail-heading">
        {getIcon("user")}
        Personal Details
      </h3>
      <ListGroup variant="flush" className="container px-lg-5 py-lg-2">
        <ListGroupItem value={props.user.name} title="Full Name" />
        <ListGroupItem value={props.user.position} title="Position" />
        <ListGroupItem
          value={props.user.dateOfBirth.split("T")[0]}
          title="Date Of Birth"
        />
        <ListGroupItem value={props.user.address} title="Address" />
        <ListGroupItem value={props.user.aadhar} title="Aadhar No" />
        <ListGroupItem value={props.user.panNo} title="Pan No" />
      </ListGroup>
      {props.user.leaveDate && <ChartUI leaves={props.user.leaveDate} />}
    </CardUI>
  ) : (
    <Spin />
  );
};

export default ProfileDetails;
