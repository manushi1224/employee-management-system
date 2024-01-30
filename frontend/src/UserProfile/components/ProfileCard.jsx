import React from "react";
import { Spin } from "antd";
import CardUI from "../../UI/CardUI";

const ProfileCard = (props) => {
  return (
    <div className="d-flex">
      {props.user ? (
        <CardUI image={props.user.image} width="100%" title={props.user.name}>
          <div className="d-flex flex-column align-items-center">
            <h6 className="text-secondary mt-3">{props.user.position}</h6>
            <h6 className="text-secondary">{props.user.address}</h6>
          </div>
        </CardUI>
      ) : (
        <Spin fullscreen />
      )}
    </div>
  );
};

export default ProfileCard;
