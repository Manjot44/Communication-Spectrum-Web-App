import React from "react";
import { Grid } from "@mui/material";
import TextFieldComponent from "./TextFieldComponent";
import SelectDOBComponent from "./SelectDOBComponent";
import DropdownComponent from "./DropdownComponent";

const SettingsSection = ({ settings, handleChange, isEditing, isPasswordChange }) => (
  <Grid container spacing={2}>
    {!isPasswordChange ? (
      <>
        <Grid item xs={12} md={6}>
          <TextFieldComponent
            label="Full Name"
            value={settings.full_name}
            onChange={handleChange("full_name")}
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextFieldComponent
            label="Email"
            value={settings.email}
            onChange={handleChange("email")}
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectDOBComponent
            label="Date of Birth"
            value={settings.dob}
            onChange={handleChange("dob")}
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DropdownComponent
            label="Country"
            value={settings.location}
            onChange={handleChange("location")}
            disabled={!isEditing}
            options={[
              { value: "Australia", label: "Australia" },
              { value: "New Zealand", label: "New Zealand" },
              { value: "United States", label: "United States" },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextFieldComponent
            label="Postcode"
            value={settings.postcode}
            onChange={handleChange("postcode")}
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DropdownComponent
            label="Profession"
            value={settings.profession}
            onChange={handleChange("profession")}
            disabled={!isEditing}
            options={[
              { value: "Speech Therapist", label: "Speech Therapist" },
              { value: "Educator", label: "Educator" },
              { value: "Psychologist", label: "Psychologist" },
            ]}
          />
        </Grid>
      </>
    ) : (
      <>
        <Grid item xs={12} md={6}>
          <TextFieldComponent
            label="Current Password"
            type="password"
            value={settings.currentPassword}
            onChange={handleChange("currentPassword")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextFieldComponent
            label="New Password"
            type="password"
            value={settings.newPassword}
            onChange={handleChange("newPassword")}
          />
        </Grid>
      </>
    )}
  </Grid>
);

export default SettingsSection;
