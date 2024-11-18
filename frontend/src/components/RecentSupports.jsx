import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModal from "./ConfirmationModal";
import ShareModal from "./ShareModal";
import IosShareIcon from '@mui/icons-material/IosShare';
import EditIcon from '@mui/icons-material/Edit';
import "../App.css";
import { RecentSupportsCard, RecentSupportImage, RecentSupportImgTag, RecentSupportEditBox, RecentSupprtTitle, RecentSupportButton } from "../Wrappers";

function RecentSupports({ profileData, token, onDelete, onClick, showIcons }) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Open confirmation modal
  const handleDeleteClick = () => {
    setIsConfirmModalOpen(true);
  };

  // Confirm deletion
  const confirmDeleteSupport = () => {
    onDelete(profileData.support_id);
    setIsConfirmModalOpen(false);
  };

  // Open Share Modal
  const handleShareClick = () => {
    setIsShareModalOpen(true);
  }

  return (
    <RecentSupportsCard>
      {/* Image container with a fixed aspect ratio */}
      <RecentSupportImage onClick={onClick}>
        {profileData.title_img && (
          <RecentSupportImgTag 
            src={profileData.title_img} 
            alt={profileData.title}
          />
        )}
      </RecentSupportImage>

      {/* Title and delete button container */}
      <RecentSupportEditBox>
        <RecentSupprtTitle>
          <b>{profileData.title}</b>
        </RecentSupprtTitle>

        {/* Edit, Share and Delete Icons */}
        {showIcons && (
          <>
            <RecentSupportButton style={{ right: 70 }}>
              <EditIcon />
            </RecentSupportButton>
            <RecentSupportButton style={{ right: 35 }} onClick={handleShareClick}>
              <IosShareIcon />
            </RecentSupportButton>
            <RecentSupportButton style={{ right: 0 }} onClick={handleDeleteClick}>
              <DeleteIcon />
            </RecentSupportButton>
          </>
        )}
      </RecentSupportEditBox>

      {/* Confirmation Modal for Deletion */}
      <ConfirmationModal
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDeleteSupport}
        message="Are you sure you want to delete this support?"
        description="This action cannot be undone. The support will be permanently deleted."
      />

      {/* Modal that pops up when you click the share icon */}
      <ShareModal
        open={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        message="Share Visual Support"
        description="Please Select User Profiles To Share"
        token={token}
        profileType={"User"}
      />
    </RecentSupportsCard>
  );
}

export default RecentSupports;
