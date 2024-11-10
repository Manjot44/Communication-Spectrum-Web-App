import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Button, IconButton, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../App.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNotification } from "../services/notificationService";
import RecentSupportsBox from "../components/RecentSupportsBox";
import CategorySelectCheckboxes from "../components/CategorySelectCheckboxes";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import VisualSupportTypes from "../components/VisualSupportTypes.jsx"; 

function Supports({ token, setTokenFunc }) {
	const { profileID } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [images, setImages] = useState(null);
  const { notify, showNotification, notificationMessage } = useNotification();
	const [supportData, setSupportData] = useState(null);
	const [profileData, setProfileData] = useState(null);

	// Booleans for the Categories
	const [selfCare, setSelfCare] = useState(false);
	const [routine, setRoutine] = useState(false);
	const [school, setSchool] = useState(false);
	const [work, setWork] = useState(false);
	const [fun, setFun] = useState(false);
	const [emotion, setEmotion] = useState(false);
	const [belief, setBelief] = useState(false);
	const [health, setHealth] = useState(false);
	const [transport, setTransport] = useState(false);
	const [event, setEvent] = useState(false);
	const [place, setPlace] = useState(false);
	const [other, setOther] = useState(false);
  
	// For popup
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	useEffect(() => {
    const fetchClient = async () => {
      try {
        const profileResponse = await axios.get(
          `http://localhost:5005/get_client/${profileID}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setProfileData(profileResponse.data.client);

        const supportResponse = await axios.get(
          `http://localhost:5005/get_client_support/${profileID}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setSupportData(supportResponse.data.client);
      } catch (err) {
        alert(err.response.data.error);
      }
    };

    fetchClient();
  }, [profileID, token]);
	
	// Fetch images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/get_images/${profileID}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setImages(response.data.images);
      } catch (err) {
        notify("Failed to fetch images.");
      }
    };
    fetchImages();
  }, [profileID, token, open, notify]);

  if (!images) return <LoadingSpinner />;

  return (
    <>
      <Navbar profileID={profileID} />
      <div className="page-wrapper-style">
        <br />
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Poppins",
              color: "#000CA4",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
            }}
          >
            <b>Visual Supports Gallery</b>
          </Typography>
          <Button
            sx={{ ml: "auto", backgroundColor: "#ff7c33" }}
            onClick={handleClickOpen}
            variant="contained"
          >
            + Add Visual Support
          </Button>
        </Box>
				<br />
				<Accordion sx={{ borderRadius: '15px', fontFamily: 'Poppins', border: 'none', color: '#000CA4' }}>
					<AccordionSummary
						expandIcon={<ArrowDownwardIcon />}
						aria-controls="panel1-content"
						id="panel2-header"
						style={{ border: "none" }}
					>
						<Typography variant="h6">
							<b>Filter by Category</b>
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							<CategorySelectCheckboxes 
								setSelfCare={(e) => setSelfCare(e.target.checked)}
								setRoutine={(e) => setRoutine(e.target.checked)}
								setSchool={(e) => setSchool(e.target.checked)}
								setWork={(e) => setWork(e.target.checked)}
								setFun={(e) => setFun(e.target.checked)}
								setEmotion={(e) => setEmotion(e.target.checked)}
								setBelief={(e) => setBelief(e.target.checked)}
								setHealth={(e) => setHealth(e.target.checked)}
								setTransport={(e) => setTransport(e.target.checked)}
								setEvent={(e) => setEvent(e.target.checked)}
								setPlace={(e) => setPlace(e.target.checked)}
								setOther={(e) => setOther(e.target.checked)}
							/>
						</Typography>
					</AccordionDetails>
				</Accordion>
				<br/>
				<RecentSupportsBox
					profileData={profileData}
					supportData={supportData}
					token={token}
					setSupportData={setSupportData}
				/>
      </div>
			<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
				maxWidth="lg"  // Set max width (options: 'xs', 'sm', 'md', 'lg', 'xl')
  			fullWidth      // Ensures the dialog stretches to the full width
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
						<VisualSupportTypes profileID={profileID} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Supports;
