import React, { useState, createContext } from 'react';
import Navbar from "../components/Navbar";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Grid,
  CardContent,
  Button,
} from "@mui/material";
import dayjs from 'dayjs';
import '../App.css';
import Arrow from '../components/Arrow';
import SelectDateCategoryComponent from '../components/SelectDateCategoryComponent';
import EditTitleComponent from '../components/EditTitleComponent';
import TaskStep from '../components/TaskStep';
import axios from "axios";
import ChangeColourModal from '../components/ChangeColourModal';
import { StepSupportWrapper, FirstThenCard, PrintBox, Centred, FirstThenMenu } from '../Wrappers.jsx';

export const firstThenContext = createContext(null);

function FirstThen({ token, setTokenFunc }) {
  // General React Functions
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
  const [isPublic, setIsPublic] = useState(state.data.isPublic);

  // Toggle colour change Modal
  const toggleColourModal = () => {
    setColourModal((prev) => !prev);
  };

  // API Request to save Visual Support
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
      <Navbar profileID={profileID}/>
      <br />
      <StepSupportWrapper>
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
              setIsPublic={(e) => setIsPublic(e.target.value)}
              showCategory={true}
            />
          </Grid>
          {/* First-Then Section */}
          <Grid item xs={12} md={9}>
            <FirstThenCard>
              <CardContent>
                {/* Title and Colour Customise Menu Buttons */}
                <FirstThenMenu variant="h6" gutterBottom>
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
                </FirstThenMenu>
                <Centred>
                  <PrintBox>
                    {/* First Box */}
                    <TaskStep
                      token={token}
                      key={1}
                      title="First"
                      updateStepName={(newName) => setFirstname(newName)}
                      updateStepImage={(imageFirst) => setImageFirst(imageFirst)}
                      stepImages={imageFirst}
                      stepNames={firstName}
                      fontColour={fontColour}
                      stepColour={stepColour}
                      showCancel={false}
                      showTime={false}
                      label={"First Step"}
                      totalSteps={0}
                      count={0}
                      id={0}
                    />
                    <Arrow style={{ width: '20px' }}/>
                    {/* Then Box */}
                    <TaskStep
                      token={token}
                      key={1}
                      title="Then"
                      updateStepName={(newName) => setThenName(newName)}
                      updateStepImage={(imageThen) => setImageThen(imageThen)}
                      stepImages={imageThen}
                      stepNames={thenName}
                      fontColour={fontColour}
                      stepColour={stepColour}
                      showCancel={false}
                      showTime={false}
                      label={"Then Step"}
                      totalSteps={0}
                      count={0}
                      id={1}
                    />
                    {/* Modal that pops up when you click on customise colour */}
                    <ChangeColourModal
                      open={colourModal}
                      onClose={toggleColourModal}
                      setStepColour={setStepColour}
                      setFontColour={setFontColour}
                    />
                  </PrintBox>
                </Centred>
              </CardContent>
            </FirstThenCard>
          </Grid>
        </Grid>
      </StepSupportWrapper>
    </>
  );
}

export default FirstThen;
