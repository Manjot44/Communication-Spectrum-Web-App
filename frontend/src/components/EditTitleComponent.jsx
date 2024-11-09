import React from "react";
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import "../App.css";

function EditTitleComponent({ text, changeText, isEditing, setIsEditing, nameError, setNameError }) {
	// Handle text change for the task analysis name
  const handleTextChange = (event) => {
		changeText(event.target.value);
    setNameError(false); // Reset error state when user types
  };

  // Toggle editing state for task name
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

	return (
		<>
			<Grid container direction="column" spacing={1}>
				<Grid item>
					{isEditing ? (
						<input
							type="text"
							value={text}
							onChange={handleTextChange}
							onBlur={toggleEditing}
							autoFocus
							style={{ borderColor: nameError ? "red" : "inherit" }}
						/>
					) : (
						<b onClick={toggleEditing} style={{ cursor: "pointer" }}>
							{text || (
								<span
									style={{
										color: nameError ? "red" : "grey",
										fontFamily: "Poppins",
									}}
								>
									Insert Task Name Here
								</span>
							)}
						</b>
					)}
				</Grid>
				<Grid item>
					{nameError && (
						<Typography
							variant="body2"
							style={{ color: "red" }}
						>
							Please enter a task name
						</Typography>
					)}
				</Grid>
			</Grid>
		</>
	);
}

export default EditTitleComponent;
