import React from "react";
import { Spin } from "antd";
import CardUI from "../../UI/CardUI";

const ProfileCard = (props) => {
  return (
    <div className="d-flex">
      {props.user ? (
        <CardUI
          image={props.user.image}
          width="100%"
          title={props.user.name}
          center={true}
          position={props.user.position}
          address={props.user.address}
        >
        </CardUI>
      ) : (
        <Spin fullscreen />
      )}
    </div>
  );
};

export default ProfileCard;
