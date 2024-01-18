import React, { useContext, useEffect } from "react";

import userContext from "../../context/userContext";
import ProfileCard from "../components/ProfileCard";
import ProfileDetails from "../components/ProfileDetails";
import ProfileLinks from "../components/ProfileLinks";

import "./Profile.css";

const Profile = () => {
  const auth = useContext(userContext);
  useEffect(() => {
    auth.getUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mt-3">
      <div className="profile-section">
        <div className="profile-card">
          <ProfileCard user={auth.currentUser} />
        </div>
        <div className="profile-details">
          <ProfileDetails user={auth.currentUser} />
        </div>
        <div className="profile-links">
          <ProfileLinks user={auth.currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
