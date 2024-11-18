import React from "react";
import { Modal, Typography, TextField, Button } from "@mui/material";
import { ModalBox } from "../Wrappers";

function ChangeColourModal ({ open, onClose, setStepColour, setFontColour }) {
	return (
		<>
			<Modal
				open={open}
				onClose={onClose}
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<ModalBox>
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
				</ModalBox>
			</Modal>
		</>
	);
}

export default ChangeColourModal;
