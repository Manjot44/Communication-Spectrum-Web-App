import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

function ChangeColourModal ({ open, onClose, setStepColour, setFontColour }) {
	return (
		<>
			<Modal
				open={open}
				onClose={onClose}
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 300,
						bgcolor: "background.paper",
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography id="modal-title" variant="h6" component="h2">
						<b>Edit Font and Box Colours</b>
					</Typography>
					<Typography id="modal-description" sx={{ mt: 2 }}>
						Box Colour
					</Typography>
					<TextField
						type="color"
						onChange={(e) => setStepColour(e.target.value)}
						fullWidth
						sx={{ mt: 1 }}
					/>
					<Typography id="modal-description" sx={{ mt: 2 }}>
						Text Colour
					</Typography>
					<TextField
						type="color"
						onChange={(e) => setFontColour(e.target.value)}
						fullWidth
						sx={{ mt: 1 }}
					/>
					<Button onClick={onClose} sx={{ mt: 2 }}>Close</Button>
				</Box>
			</Modal>
		</>
	);
}

export default ChangeColourModal;
