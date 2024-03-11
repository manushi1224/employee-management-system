import React from "react";
import { Card } from "react-bootstrap";
import { Avatar } from "antd";

import "./CardUI.css";

const CardUI = (props) => {
  return (
    <Card style={{ width: props.width }} className="p-2 m-2">
      <Card.Body>
        {props.image && (
          <div
            className={`d-flex ${props.center ? "justify-content-left" : ""}`}
          >
            <Avatar
              size={props?.imgSize || 64}
              src={`https://employee-management-system-ujnj.onrender.com/${props.image}`}
              className="my-2"
            />
            {props.title && (
              <Card.Title className="text-center ms-3 my-2">
                <h3 className="profile-detail-heading">{props.title}</h3>
                {props.position && (
                  <h6 className="fw-bold">{props.position}</h6>
                )}
                {props.address && <h6>{props.address}</h6>}
              </Card.Title>
            )}
          </div>
        )}
        {props.children}
      </Card.Body>
    </Card>
  );
};

export default CardUI;
