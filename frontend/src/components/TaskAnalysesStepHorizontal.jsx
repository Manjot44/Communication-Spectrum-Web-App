import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import {
  TextField,
} from "@mui/material";
import VisualSupportImage from './VisualSupportImage';
import CancelIcon from '@mui/icons-material/Cancel';

function TaskAnalysesStepHorizontal ({ image, setImage, index, deleteImage, removeStep, setName, stepName, setTime, stepTime }) {
	const handleTimeChange = (e) => {
    let input = e.target.value;
    
    // Regular expression to validate time in HH:MM:SS format
    const validTimeFormat = /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    
    // Allow typing if the format is valid or partial (for user-friendly input)
    if (input === "" || validTimeFormat.test(input) || /^(\d{0,2}:?\d{0,2}:?\d{0,2})$/.test(input)) {
      setTime(input);
    }
  };

  return (
    <>
      <Grid container direction="column" spacing={0} style={{ margin: '5px' }}>
				<Grid item xs={12} style={{ color: 'white', backgroundColor: '#000CA4', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', borderRadius: '15px 15px 0 0' }}>
					Step {index + 1}
					<CancelIcon  sx={{ position: 'absolute', right: 8, top: 6 }} onClick={removeStep}/>
				</Grid>
				<Grid item xs={12} style={{ borderRadius: '0 0 15px 15px' }}>
					{/* Inside Grid */}
					<Grid container spacing={0}>
						<Grid item xs={12} md={9} style={{ backgroundColor: 'white' }}>
							<Box sx={{ height: '200px', width: '350px' }} style={{ padding: '0 15px', alignItems: "center", justifyContent: "center" }}>
								<div>
									<br/>
									<TextField
										label="Step Name"
										variant="outlined"
										fullWidth
										style={{
											marginBottom: "20px",
											backgroundColor: "white",
										}}
										defaultValue={stepName}
										onChange={(e) => setName(e.target.value)}
									/>
									<br />
									<TextField
										label="Timer"
										variant="outlined"
										fullWidth
										style={{
											marginBottom: "20px",
											backgroundColor: "white",
										}}
										value={stepTime}
										onChange={handleTimeChange}
										inputProps={{ inputMode: 'numeric', pattern: "[0-9]*" }}
										placeholder="00:00:00"
									/>
								</div>
							</Box>
						</Grid>
						<Grid item xs={12} md={3} style={{ backgroundColor: 'white' }}>
							<Box sx={{ height: '200px', width: '200px' }} style={{ padding: '5px 5px' }}>
								<VisualSupportImage uniqueID={index} imgHeight="80%" image={image} setImage={setImage} deleteImage={deleteImage}/>
							</Box>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
    </>
  );
}

export default TaskAnalysesStepHorizontal;
