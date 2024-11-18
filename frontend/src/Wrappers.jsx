import { styled } from "@mui/system";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CancelIcon from '@mui/icons-material/Cancel';
import Accordion from '@mui/material/Accordion';
import { TextField, Typography, Card, Button, Stack, Box } from "@mui/material";
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
  color: 'white'
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
  color: 'white'
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
  color: 'white'
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
  width: '100%'
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
  gap: '16px', /* equivalent to gap={2} */
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
