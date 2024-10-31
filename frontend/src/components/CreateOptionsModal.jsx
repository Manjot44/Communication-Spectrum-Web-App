import React from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
	width: '30%',

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function CreateOptionsModal({ open, title, pic: Icon, children }) {
	// Only render the div if `open` is true
	if (!open) return null;

	return (
		<div>
			{/* <img src={pic} alt="option icon" style={{ height: '7vh', width: '7vh' }} /> */}
			{Icon && <Icon style={{ fontSize: '3rem', marginBottom: '10px' }} />} {/* Customize icon styling here */}
			<Typography id="modal-title" variant="h6" component="h2">
				{title}
			</Typography>
			<Typography id="modal-description" sx={{ mt: 2 }}>
				{children}
			</Typography>
		</div>
	);
}


export default CreateOptionsModal;
