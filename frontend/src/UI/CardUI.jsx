import React from "react";
import { Card } from "react-bootstrap";

const CardUI = (props) => {
  return (
    <Card style={{ width: props.width }} className="p-2 m-2 shadow">
      <Card.Body>
        {props.image && (
          <div className="d-flex justify-content-center mt-3">
            <Card.Img
              variant="top"
              src={`/${props.image}`}
              className="w-25 rounded-circle"
            ></Card.Img>
          </div>
        )}
        {props.title && (
          <Card.Title className="text-center mt-3">
            <h3 className="fw-bold">{props.title}</h3>
          </Card.Title>
        )}
        {props.children}
      </Card.Body>
    </Card>
  );
};

export default CardUI;
