import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  Button,
  Box,
  Modal,
  TextField
} from "@mui/material";
import dayjs from 'dayjs';
import '../App.css';
import Arrow from '../components/Arrow';
import SelectDateCategoryComponent from '../components/SelectDateCategoryComponent';
import EditTitleComponent from '../components/EditTitleComponent';
import ChoiceBoardStep from '../components/TaskStep';
import axios from "axios";
import ChangeColourModal from '../components/ChangeColourModal';

function FirstThen({ token, setTokenFunc }) {
  const navigate = useNavigate();
  const { profileID } = useParams();
  const { state } = useLocation();
  
  // Destructure data from state 
  const data = state?.data;
  const [text, setText] = useState(data?.title || "");
  const [date, setDate] = useState(dayjs(data?.date) || dayjs());
  const [category, setCategory] = useState(data?.category || "");
  const [image, setImage] = useState(data?.title_img || null);

  const stepImages = data?.step_img || [];
  const stepNames = data?.step_names || [];
  const [imageFirst, setImageFirst] = useState(stepImages[0] || null);
  const [imageThen, setImageThen] = useState(stepImages[1] || null);
  const [firstName, setFirstname] = useState(stepNames[0] || "");
  const [thenName, setThenName] = useState(stepNames[1] || "");
  const [stepColour, setStepColour] = useState(data?.step_colour || '#000CA4');
  const [fontColour, setFontColour] = useState(data?.font_colour || 'white');
  const [isMade, setIsMade] = useState(data?.isMade || false);

  const [isEditing, setIsEditing] = useState(false);
  const [colourModal, setColourModal] = useState(false);
  const [nameError, setNameError] = useState(false);

  // Toggle colour change Modal
  const toggleColourModal = () => {
    setColourModal((prev) => !prev);
  };

  const handleCreate = async () => {
    if (text.trim() === "") {
      setNameError(true); // Set error state if no name is entered
      return;
    }
    try {
      const timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");
      const formattedDate = date.format("YYYY-MM-DD");
      await axios.post(
        `http://localhost:5005/new_support/${profileID}`,
        {
          type: state.state.type,
          text,
          image,
          date: formattedDate,
          stepImages: [imageFirst, imageThen],
          stepNames: [firstName, thenName],
          category,
          timestamp,
          stepColour,
          fontColour,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      navigate(`/home/${profileID}`);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins"
        rel="stylesheet"
      ></link>
      <Navbar profileID={profileID}/>
      <br />
      <div className="page-wrapper-style" style={{ padding: '0 1%' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <SelectDateCategoryComponent
              token={token}
              date={date}
              changeDate={(newDate) => setDate(newDate)}
              category={category}
              changeCategory={(e) => setCategory(e.target.value)}
              handleCreate={handleCreate}
              image={image}
              setImage={(image) => setImage(image)}
            />
          </Grid>
          {/* First-Then Section */}
          <Grid item xs={12} md={9}>
            <Card className="task-analyses-create-options" style={{ backgroundColor: 'white', height: '87vh' }}>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{
                    margin: "10px",
                    fontFamily: "Poppins",
                    color: "black",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                <EditTitleComponent
                  text={text}
                  changeText={setText}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  nameError={nameError}
                  setNameError={setNameError}
                  defaultText="Insert First-Then Support Name"
                  errorMsg="Please enter a name for this First-Then visual support"
                />
                <Button onClick={toggleColourModal}>Customise Colour</Button>
                </Typography>
                <div 
                    class="d-flex justify-content-center align-items-center"  
                  >
                  <div>
                    <Grid
                      class="d-flex justify-content-center align-items-center" 
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        height: "75vh",
                      }}
                    >
                      <ChoiceBoardStep
                        token={token}
                        image={imageFirst}
                        index="First"
                        title="First"
                        setName={(newName) => setFirstname(newName)}
                        setImage={(imageFirst) => setImageFirst(imageFirst)}
                        label="First Step"
                        showCancel={false}
                        fontColour={fontColour}
                        stepColour={stepColour}
                      />
                      <Arrow style={{ width: '20px' }}/>
                      <ChoiceBoardStep
                        token={token}
                        image={imageThen}
                        index="Then"
                        title="First"
                        setName={(newName) => setThenName(newName)}
                        setImage={(imageThen) => setImageThen(imageThen)}
                        label="Then Step"
                        showCancel={false}
                        fontColour={fontColour}
                        stepColour={stepColour}
                      />
                      <ChangeColourModal
                        open={colourModal}
                        onClose={toggleColourModal}
                        setStepColour={setStepColour}
                        setFontColour={setFontColour}
                      />
                    </Grid>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default FirstThen;
