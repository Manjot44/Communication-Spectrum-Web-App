import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "750px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  textAlign: "center",
};

function ConfirmationModal({ open, onClose, onConfirm, message, description }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            fontSize: "1.3rem",
            fontWeight: 600,
            whiteSpace: "normal",
            wordWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {message || "Are you sure you want to proceed?"}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: 1, fontSize: "0.9rem" }}
          >
            {description}
          </Typography>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            sx={{ width: "100px" }}
          >
            Yes
          </Button>
          <Button variant="outlined" onClick={onClose} sx={{ width: "100px" }}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ConfirmationModal;
