import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import userContext from "../../context/userContext";
import ProfileCard from "../../UserProfile/components/ProfileCard";
import ProfileDetails from "../../UserProfile/components/ProfileDetails";
import ProfileLinks from "../../UserProfile/components/ProfileLinks";
import EditEmployee from "../../User/pages/EditEmployee";

import { Spin } from "antd";
import { Button } from "react-bootstrap";

import "./Profile.css";
import getIcon from "../../utils/getIcon";

const Profile = () => {
  const auth = useContext(userContext);
  const { uid } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(undefined);

  const changeMode = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    const getSelectedUserData = async () => {
      try {
        const response = await axios.get(`https://employee-management-system-ujnj.onrender.com/api/users/${uid}`);
        setSelectedUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getSelectedUserData();
  }, [uid, editMode]);

  if (!editMode) {
    return (
      <>
        {selectedUser !== undefined ? (
          <div className="container mt-3">
            <div className="text-end">
              <Button
                className="custom-button"
                onClick={changeMode}
                variant=""
                disabled={!auth.isSuperUser && auth.userId !== selectedUser._id}
              >
                {getIcon("edit")} Edit Info
              </Button>
            </div>
            <div className="container mt-3">
              <div className="row">
                <div className="col-md-12 col-lg-4">
                  <div className="profile-card">
                    <ProfileCard user={selectedUser} editMode={editMode} />
                  </div>
                  <div className="profile-links mt-lg-4">
                    <ProfileLinks user={selectedUser} editMode={editMode} />
                  </div>
                </div>
                <div className="co-md-12 col-lg-8">
                  <div className="profile-details">
                    <ProfileDetails user={selectedUser} editMode={editMode} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Spin fullscreen></Spin>
        )}
      </>
    );
  }

  return <EditEmployee user={selectedUser} changeMode={changeMode} />;
};

export default Profile;
