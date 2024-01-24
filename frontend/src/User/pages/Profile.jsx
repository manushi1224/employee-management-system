import React, { useContext, useEffect, useState } from "react";

import userContext from "../../context/userContext";
import ProfileCard from "../components/ProfileCard";
import ProfileDetails from "../components/ProfileDetails";
import ProfileLinks from "../components/ProfileLinks";
import { Button } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import "./Profile.css";
import EditEmployee from "./EditEmployee";

const Profile = () => {
  const auth = useContext(userContext);
  const [editMode, setEditMode] = useState(false);

  const changeMode = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    auth.getUserData();
    // eslint-disable-next-line
  }, []);

  if (!editMode) {
    return (
      <div className="container mt-3">
        <div className="text-end">
          <Button variant="dark" onClick={changeMode}>
            <FaRegEdit className="mb-1 me-2" /> Edit Info
          </Button>
        </div>
        <div className="profile-section">
          <div className="profile-card">
            <ProfileCard user={auth.currentUser} editMode={editMode} />
          </div>
          <div className="profile-details">
            <ProfileDetails user={auth.currentUser} editMode={editMode} />
          </div>
          <div className="profile-links">
            <ProfileLinks user={auth.currentUser} editMode={editMode} />
          </div>
        </div>
      </div>
    );
  }

  return <EditEmployee user={auth.currentUser} changeMode={changeMode}/>;
};

export default Profile;
