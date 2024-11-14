import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Button, Typography, Box, Grid, Divider } from "@mui/material";
import dayjs from "dayjs";
import NotificationPopup from "../components/NotificationPopup";
import SettingsCard from "../components/SettingsCard";
import SettingsSection from "../components/SettingsSection";
import { useParams } from "react-router-dom";

const MySettings = ({ token }) => {
  const { profileID } = useParams();
  const [settings, setSettings] = useState({
    full_name: "",
    email: "",
    dob: dayjs(),
    location: "",
    postcode: "",
    profession: "",
    is_subbed: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState("");
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });

  useEffect(() => {
    fetchSettings();
  }, []);

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

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSaveSettings = async () => {
    try {
      await axios.put(
        "http://localhost:5005/admin/auth/update_user_settings",
        { ...settings, dob: settings.dob.format("YYYY-MM-DD") },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotification("Settings updated successfully!");
      setIsEditing(false);
    } catch (error) {
      setNotification("Failed to save settings. Please try again.");
    }
  };

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
      <Box sx={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
        <Typography variant="h3" align="center" gutterBottom style={{ fontFamily: "Poppins", color: "#000CA4" }}>
        <b>My Settings</b>
        </Typography>

        <Button
          onClick={handleEditToggle}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginBottom: "20px", bgcolor: "#000CA4", ":hover": { bgcolor: "#3333cc" } }}
        >
          {isEditing ? "Cancel Edit" : "Edit Settings"}
        </Button>

        <SettingsCard title="Profile Information">
          <SettingsSection
            settings={settings}
            handleChange={handleChange}
            isEditing={isEditing}
            isPasswordChange={false}
          />
          {isEditing && (
            <Button
              onClick={handleSaveSettings}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "20px", bgcolor: "#000CA4", ":hover": { bgcolor: "#3333cc" } }}
            >
              Save Changes
            </Button>
          )}
        </SettingsCard>

        <Divider sx={{ marginY: "30px" }} />

        <SettingsCard title="Change Password">
          <SettingsSection
            settings={passwords}
            handleChange={(field) => (e) => setPasswords({ ...passwords, [field]: e.target.value })}
            isEditing={true}
            isPasswordChange={true}
          />
          <Button
            onClick={handlePasswordChange}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "20px", bgcolor: "#000CA4", ":hover": { bgcolor: "#3333cc" } }}
          >
            Change Password
          </Button>
        </SettingsCard>
      </Box>

      {notification && <NotificationPopup message={notification} onClose={() => setNotification("")} />}
    </>
  );
};

export default MySettings;
