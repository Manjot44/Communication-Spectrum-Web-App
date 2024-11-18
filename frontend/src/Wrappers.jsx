import { styled } from "@mui/system";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CancelIcon from '@mui/icons-material/Cancel';
import Accordion from '@mui/material/Accordion';
import { TextField, Typography, Card, Button, Stack, Box, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";
import "@fontsource/poppins";

export const PageWrapperStyle = styled('div')({
	padding: "0 120px",
	fontFamily: "Poppins",
	backgroundColor: "rgb(247, 247, 247)",
	minHeight: "100vh",
});

export const StepSupportWrapper = styled(PageWrapperStyle)({
  padding: "0 1%",
});

export const PrintBox = styled('div')({
  display: "flex",
  flexWrap: "wrap",
  height: "75vh",
  margin: '10px'
});

export const OuterPrintBox = styled('div')({
  display: "flex",
  flexWrap: "wrap",
  overflowY: "scroll",
  height: "70vh",
});

export const Centred = styled('div')({
  display: "flex",
  justifyContent: 'center',
  alignItems: 'center'
});

export const Title = styled(Typography)({
  fontFamily: "Poppins", 
	color: "#000CA4",
  textAlign: 'center',
  marginBottom: '16px'
});

export const SnapShotStyleCard = styled(Card)({
  height: "700px",
  fontFamily: "Poppins",
  borderRadius: "15px",
  color: "#000CA4",
  padding: "20px",
});

export const SnapshotStyleDiv = styled('div')({
  padding: '20px',
  backgroundColor: '#f0f0f0',
  borderRadius: '15px',
  color: '#000ca4',
});

export const InnerSnapShotBox = styled('div')({
  overflowY: "auto",
  height: "650px",
  padding: "15px",
});

// Login Screens
export const DarkBlueButton = styled(Button)({
  backgroundColor: "#000CA4",
  width: "75%",
  borderRadius: "20px",
  fontFamily: "Poppins",
});

export const LoginText = styled('h4')({
  fontFamily: "Poppins",
  color: 'black',
  fontWeight: 'bold',
});

export const LoginFormBox = styled('div')({
  width: '30%',
  height: '90vh',
  textAlign: 'center',
  backgroundColor: 'white',
  borderRadius: '15px',
});

export const LoginBackground = styled('div')({
  minHeight: '100vh',
  backgroundColor: '#000ca4',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export const LoginStack = styled(Stack)({
  alignItems: 'center',
});

// Arrows for TaskStep and TaskStep Horizontal Components
export const LeftArrow = styled(IconButton)({
  position: 'absolute',
  left: 1,
  color: 'white',
  fontFamily: 'Poppins'
});

export const LeftArrowIcon = styled(ArrowBackIcon)({
  transition: "color 0.3s ease, transform 0.3s ease",
  "&:hover": {
    color: "rgb(240, 146, 146)",
    transform: "scale(1.05)",
  },
});

export const RightArrow = styled(IconButton)({
  position: 'absolute',
  left: 25,
  color: 'white',
  fontFamily: 'Poppins'
});

export const RightArrowIcon = styled(ArrowForwardIcon)({
  transition: "color 0.3s ease, transform 0.3s ease",
  "&:hover": {
    color: "rgb(240, 146, 146)",
    transform: "scale(1.05)",
  },
});

export const StepIndex = styled(Typography)({
  fontFamily: "Poppins",
  alignContent: "center",
});

export const DeleteButton = styled(IconButton)({
  position: 'absolute',
  right: 8,
  color: 'white',
  fontFamily: 'Poppins'
});

export const CrossIcon = styled(CancelIcon)({
  transition: "color 0.3s ease, transform 0.3s ease",
  "&:hover": {
    color: "rgb(240, 146, 146)",
    transform: "scale(1.05)",
  },
});

export const DescriptionBox = styled(TextField)({
	marginTop: "15px",
	marginBottom: "5px",
	backgroundColor: "white",
	width: "100%",
});

// For FirstThen
export const FirstThenCard = styled(Card)({
  backgroundColor: 'white',
  color: '#000ca4',
  borderRadius: '15px',
  fontFamily: "Poppins",
  height: '87vh'
});

export const FirstThenMenu = styled(Typography)({
  margin: "10px",
  fontFamily: "Poppins",
  color: "black",
  display: "flex",
  justifyContent: "space-between",
});

// For Gallery
export const GalleryBox = styled(Box)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const ImageOverlayOuter = styled('div')({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
});

export const ImageOverlayInner = styled('div')({
  position: "relative"
});

// Home Page
export const EditUserBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "1600px",
  height: "auto",
  maxHeight: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
});

// Mysettings
export const MySettingsBox = styled(Box)({
  padding: "40px",
  maxWidth: "800px",
  margin: "0 auto"
});

export const SaveButton = styled(Button)({
  marginBottom: "20px",
  backgroundColor: "#000CA4",
  "&:hover": { backgroundColor: "#3333cc" },
  width: '100%',
  fontFamily: 'Poppins'
});

// MySettingsFromUserManage
export const FromUserManageBox = styled(Box)({
  padding: "40px",
  maxWidth: "800px",
  margin: "0 auto"
});

// Supports Gallery
export const SupportsHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
});

export const AddSupport = styled(Button)({
  position: "absolute",
  right: 0,
  backgroundColor: "#ff7c33",
  fontFamily: 'Poppins'
});

export const SharedAccordion = styled(Accordion)({
  borderRadius: '15px',
  fontFamily: 'Poppins',
  border: 'none',
  color: '#000CA4'
});

// UserManage.jsx
export const UserManageHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const UserManageOptions = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: '16px', /* equivalent to mt={2} */
  gap: '16px',       /* equivalent to gap={2} */
});

// ViewSupport
export const ViewSupportHeader = styled(Typography)({
  margin: "10px",
  fontFamily: "Poppins",
  color: "black",
  display: "flex",
  justifyContent: "space-between",
});

export const ViewSupportCard = styled(Card)({
  backgroundColor: 'white',
  height: '87vh',
  width: '100%'
});

// Modals
export const ModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  padding: '25px',
  boxShadow: 24,
  p: 4,
});

export const ChooseFromGalleryBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "63%",
  height: "80%",
  backgroundColor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  textAlign: "center",
  padding: "20px"
});

// General Wrapper
export const BlueColour = styled('div')({
  color: "#000CA4"
});

export const ButtonsBox = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  marginTop: 10,
  fontFamily: 'Poppins'
});

// FromScratch
export const FromScratchToolBox = styled(Box)({
  display: "flex",                          // Make it a flex container
  flexDirection: "row",                     // Horizontal layout
  alignItems: "center",                     // Vertically center the content
  justifyContent: "space-evenly",           // Evenly space buttons
  height: "8vh",                            // Set toolbar height
  backgroundColor: "white",                 // Optional: Set background color
  boxShadow: "0px 2px 4px rgba(0,0,0,0.1)", // Optional: Add a shadow
  padding: "0 16px",                        // Add horizontal padding
  overflowX: "auto",                        // Allow horizontal scrolling if content overflows
});


//NavBar
export const NavBar = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#000ca4',
  padding: '10px 20px',
  color: 'white',
  fontFamily: "Poppins"
});

export const LogoBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

export const NavbarLink = styled(Link)({
  margin: '0 10px',
  color: 'white',
  textDecoration: 'none',
});

export const NavbarLinks = styled('div')({
  display: 'flex'
});

export const SwitchProfileButton = styled(Button)({
  backgroundColor: '#00c89c',
  color: 'white',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  "&:hover": {
    backgroundColor: "#09a281",
  },
});

// Professional and User Profile Boxes (for sharing)
export const ProfileCheckBox = styled(Checkbox)({
  position: "absolute",
  bottom: 0,
  right: 8,
  color: "#ff7c33",
  "&.Mui-checked": {
    color: "#ff7c33",
  },
});

// RecentSupports
export const RecentSupportsCard = styled(Card)({
  padding: '10px',
  marginBottom: '20px',
  backgroundColor: 'white',
  width: '100%',
  textAlign: 'center',
  border: '1px solid #000ca4',
  color: '#000ca4',
  borderRadius: '15px',
  transition: 'transform 0.3s',
  "&:hover": {
    transform: "scale(1.05)",
  },
});

export const RecentSupportImage = styled('div')({
  position: "relative",
  width: "100%",
  paddingBottom: "56.25%", // 16:9 aspect ratio (adjust this if needed)
  overflow: "hidden",
  borderRadius: "10px",
});

export const RecentSupportImgTag = styled('img')({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "5px",
});

export const RecentSupportEditBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: "10px",
  position: "relative"
});

export const RecentSupprtTitle = styled(Typography)({
  fontSize: "1.2rem",
  textAlign: "center"
});

export const RecentSupportButton = styled(IconButton)({
  color: "grey",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
});

export const NoSupportsTypography = styled(Typography)({
  marginTop: "20px",
  color: "#666",
  textAlign: 'center'
});

// Left hand Menu in Editing Visual Support Pages
export const LeftMenuCard = styled(Card)({
  backgroundColor: 'white',
  color: 'black',
  borderRadius: '0px',
  fontFamily: "Poppins",
  height: '87.5vh',
  boxShadow: '0 4px 8px 0 rgba(153, 153, 153, 0.2) 0 6px 20px 0 rgba(153, 153, 153, 0.2)',
});

export const CreateSupportButton = styled(Button)({
  width: "100%",
  backgroundColor: "#26c3ba",
  fontFamily: "Poppins",
});

// Share Modal
export const ShareModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "63%",
  height: "70%",
  backgroundColor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  textAlign: "center",
  padding: 30
});

// User Profiles
export const UserProfileCircleOuter = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  padding: 2,
  borderRadius: "12px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  width: "200px",
  height: "270px",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 112, 255, 0.5)",
  },
  position: "relative",
});

export const UserProfileCircle = styled(Box)({
  width: "80%",
  height: "auto",
  borderRadius: "50%",
  marginBottom: "12px",
  border: "2px solid #ddd",
});

export const UserProfileName = styled(Typography)({
  fontWeight: "bold",
  fontFamily: "Poppins",
  color: "#333",
  textAlign: "center",
  marginBottom: "auto",
});

export const UserProfileCircleButtonBox = styled(Box)({
  display: "flex",
  gap: 1,
  justifyContent: "center",
  marginTop: "auto",
  paddingTop: "8px",
});

export const PoppinsButton = styled(Button)({
  fontFamily: 'Poppins'
});