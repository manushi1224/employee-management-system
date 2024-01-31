import React from "react";
import { Card } from "react-bootstrap";
import { Avatar } from "antd";

const CardUI = (props) => {
  return (
    <Card style={{ width: props.width }} className="p-2 m-2 shadow">
      <Card.Body>
        {props.image && (
          <div
            className={`d-flex ${props.center ? "justify-content-center" : ""}`}
          >
            <Avatar size={props?.imgSize || 64} src={props.image} className="me-3 my-2" />
            {props.title && (
              <Card.Title className="text-center ms-3 my-3">
                <h3 className="fw-bold">{props.title}</h3>
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
