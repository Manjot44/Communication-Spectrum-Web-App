import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Divider } from "@mui/material";
import dayjs from "dayjs";
import NotificationPopup from "../components/NotificationPopup";
import SettingsCard from "../components/SettingsCard";
import SettingsSection from "../components/SettingsSection";
import { useParams } from "react-router-dom";
import { MySettingsBox, Title, SaveButton } from "../Wrappers";

const MySettings = ({ token }) => {
  const { profileID } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState("");
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [settings, setSettings] = useState({
    full_name: "",
    email: "",
    dob: dayjs(),
    location: "",
    postcode: "",
    profession: "",
    is_subbed: false,
  });

  // API request to fetch current details of the user profile
  // Function is called when the page loads through UseEffect hook
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("http://localhost:5005/admin/auth/get_user_settings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSettings({
          ...response.data,
          dob: dayjs(response.data.dob),
        });
      } catch (error) {
        setNotification("Failed to load settings. Please try again later.");
      }
    };

    fetchSettings();
  }, [token]);

  

  // Toggle that lets user edit their details
  const handleEditToggle = () => setIsEditing(!isEditing);

  // API request to save new user profile details
  // Function is called when the user clicks save changes button
  const handleSaveSettings = async () => {
    try {
      await axios.put(
        "http://localhost:5005/admin/auth/update_user_settings",
        { ...settings, dob: settings.dob.format("YYYY-MM-DD") }, // Ensure email is included in settings
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotification("Settings updated successfully!");
      setIsEditing(false);
    } catch (error) {
      setNotification("Failed to save settings. Please try again.");
    }
  };

  // API request to change the password of professional profile
  // Function called when the "change password" button is clicked
  const handlePasswordChange = async () => {
    try {
      await axios.put(
        "http://localhost:5005/admin/auth/change_password",
        passwords,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotification("Password changed successfully!");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (error) {
      setNotification("Failed to change password. Please check your current password.");
    }
  };

  const handleChange = (field) => (event) => {
    const value = field === "dob" ? event : event.target.value;
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Navbar profileID={profileID} />
      <MySettingsBox>
        <Title variant="h3">
          <b>My Settings</b>
        </Title>
        <SaveButton onClick={handleEditToggle} variant="contained">
          {isEditing ? "Cancel Edit" : "Edit Settings"}
        </SaveButton>
        {/* Box displaying current profile information. User
            can edit when "Edit Settings" button is clicked*/}
        <SettingsCard title="Profile Information">
          <SettingsSection
            settings={settings}
            handleChange={handleChange}
            isEditing={isEditing}
            isPasswordChange={false}
          />
          <br />
          {/* Save changes button appears when the user has the 
              ability to edit after clicking on Edit Settings */}
          {isEditing && (
            <SaveButton onClick={handleSaveSettings} variant="contained">
              Save Changes
            </SaveButton>
          )}
        </SettingsCard>
        
        <Divider sx={{ marginY: "30px" }} />
        
        {/* Card where user can change their password. User must enter
            the same password in both boxes to successfully change password*/}
        <SettingsCard title="Change Password">
          <SettingsSection
            settings={passwords}
            handleChange={(field) => (e) => setPasswords({ ...passwords, [field]: e.target.value })}
            isEditing={true}
            isPasswordChange={true}
          />
          <br />
          <SaveButton onClick={handlePasswordChange} variant="contained">
            Change Password
          </SaveButton>
        </SettingsCard>
      </MySettingsBox>

      {notification && 
        <NotificationPopup 
          message={notification} 
          onClose={() => setNotification("")} 
        />
      }
    </>
  );
};

export default MySettings;
