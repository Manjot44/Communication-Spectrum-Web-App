import React from "react";
import { Modal, Typography, Button } from "@mui/material";
import { ModalBox, Title, ButtonsBox } from "../Wrappers";

function ConfirmationModal({ open, onClose, onConfirm, message, description }) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalBox>
        {/* Modal Message */}
        <Title variant="h6">
          <b>{message || "Are you sure you want to proceed?"}</b>
        </Title>
        {description && (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ textAlign: "center", fontFamily: 'Poppins' }}
          >
            {description}
          </Typography>
        )}
        {/* Box with buttons at bottom of modal */}
        <ButtonsBox>
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            sx={{ width: "100px", fontFamily: 'Poppins' }}
          >
            Yes
          </Button>
          <Button 
            variant="outlined" 
            onClick={onClose} 
            sx={{ width: "100px", fontFamily: 'Poppins' }}
          >
            Cancel
          </Button>
        </ButtonsBox>
      </ModalBox>
    </Modal>
  );
}

export default ConfirmationModal;
