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

  // Data for the TaskStep boxes
  const [text, setText] = useState(state.data.text);
  const [imageFirst, setImageFirst] = useState(state.data.imageFirst);
  const [imageThen, setImageThen] = useState(state.data.imageThen);
  const [firstName, setFirstname] = useState(state.data.firstName);
  const [thenName, setThenName] = useState(state.data.thenName);

  // Variables for the top menu in right box (TaskHeader)
  const [isEditing, setIsEditing] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [stepColour, setStepColour] = useState('#000CA4');
  const [fontColour, setFontColour] = useState('white');
  const [colourModal, setColourModal] = useState(false);

  // Data for the left hand menu (SelectDateCategoryComponent)
  const [image, setImage] = useState(state.data.image);
  const [category, setCategory] = useState(state.data.category);
  const [date, setDate] = useState(dayjs());
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
      await axios.post(
        `http://localhost:5005/new_support/${profileID}`,
        {
          type: "First-Then",
          text,
          image,
          date,
          stepImages: [imageFirst, imageThen],
          stepNames: [firstName, thenName],
          stepTimes: null,
          category,
          isHorizontal: null,
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
