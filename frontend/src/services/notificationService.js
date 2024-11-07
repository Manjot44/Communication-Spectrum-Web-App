// Instructions for how to use:
//
// Import the popup and notification service
// IMPORTANT: BOTH MUST BE IMPORTED
// import NotificationPopup from "../components/NotificationPopup";
// import { useNotification } from "../services/notificationService";
//
// Add hooks
// const { notify, showNotification, notificationMessage } = useNotification();
//
// Replace alerts or simply use
// notify("notification");
//
// Add the following to return
//   {/* Notification Popup */}
//   {showNotification && (
//     <NotificationPopup
//       message={notificationMessage}
//       duration={3000} // Customize duration as needed
//       onClose={() => notify("")}
//     />
//   )}

import { useState } from "react";

export const useNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const notify = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 5000); // Duration of showing noficiation
  };

  return { notify, showNotification, notificationMessage };
};
