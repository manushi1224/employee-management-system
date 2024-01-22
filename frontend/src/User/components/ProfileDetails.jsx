import React from "react";
import CardUI from "../../UI/CardUI";
import { ListGroup } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { Spin } from "antd";

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
        <h4 className="text-center mb-4"><FaUserCircle className="mb-1 me-3"/>Personal Details</h4>
      <ListGroup variant="flush" className="container px-5 py-2">
        <ListGroupItem value={props.user.name} title="Full Name" />
        <ListGroupItem value={props.user.email} title="Email" />
        <ListGroupItem value={props.user.phone} title="Phone No." />
        <ListGroupItem value={props.user.address} title="Address" />
        <ListGroupItem value={props.user.aadhar} title="Aadhar No" />
        <ListGroupItem value={props.user.panNo} title="Pan No" />
      </ListGroup>
    </CardUI>
  ) : (
    <Spin />
  );
};

export default ProfileDetails;
