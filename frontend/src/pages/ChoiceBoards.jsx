import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import '../App.css';
import dayjs from "dayjs";
import SelectDateCategoryComponent from '../components/SelectDateCategoryComponent';
import TaskHeader from "../components/Taskheader.jsx";
import LoadTaskSteps from '../components/LoadTaskSteps.jsx';

function ChoiceBoards({ token, setTokenFunc }) {
  const { profileID } = useParams();
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(dayjs());               // Date of the Visual Support
  const [category, setCategory] = useState("");            // Variable storing category type
  const [nameError, setNameError] = useState(false);       // State for task name error
  const [choices, setChoices] = useState([]);
  const [choiceNames, setChoiceNames] = useState([]);
  const [choiceImages, setChoiceImages] = useState([]);
  const [isHorizontal, setIsHorizontal] = useState(false);

  const handleCreate = async () => {
    if (text.trim() === "") {
      setNameError(true); // Set error state if no name is entered
      return;
    }
    // ADD PUT REQUEST HERE
  };

  // Add new choice to choice board
  const addChoice = () => {
    const newChoice = { id: Date.now() };
    setChoices([...choices, newChoice]);
    setChoiceImages([...choiceImages, null]);
    setChoiceNames([...choiceNames, null]);
  };

  // Remove choice from choice board
  const removeChoice = (index, id) => {
    setChoices(choices.filter((choice) => choice.id !== id));
    setChoiceImages(choiceImages.filter((_, imgIndex) => imgIndex !== index));
    setChoiceNames(choiceNames.filter((_, imgIndex) => imgIndex !== index));
  }

  // Update name for particular choice on choice board
  const updateChoiceImage = (index, newImage) => {
    const updatedImages = [...choiceImages];
    updatedImages[index] = newImage;
    setChoiceImages(updatedImages);
  };

  // Update name for choice on choice board
  const updateChoiceName = (index, newName) => {
    const updatedNames = [...choiceNames];
    updatedNames[index] = newName;
    setChoiceNames(updatedNames);
  };

  // Delete an image change for a specific choice
  const deleteChoiceImageChange = (index) => {
    const updatedImages = [...choiceImages];
    updatedImages[index] = "";
    setChoiceImages(updatedImages);
  };

  // Toggle between horizontal and vertical step display
  const toggleComponentType = () => {
    setIsHorizontal((prev) => !prev);
  };

  return (
    <>
      <Navbar profileID={profileID}/>
      <br />
      <div class='page-wrapper-style' style={{ padding: '0 1%' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <SelectDateCategoryComponent
              date={date}
              changeDate={(newDate) => setDate(newDate)}
              category={category}
              changeCategory={(e) => setCategory(e.target.value)}
              handleCreate={handleCreate}
              image={image}
              setImage={(image) => setImage(image)}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Card
              className="task-analyses-create-options"
              style={{ height: "87vh" }}
            >
              <CardContent>
                <TaskHeader
                  text={text}
                  setText={setText}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  nameError={nameError}
                  setNameError={setNameError}
                  toggleComponentType={toggleComponentType}
                  addStep={addChoice}
                  defaultText="Insert Choice Board Name"
                  errorMsg="Please enter a name for this choice board"
                  addMsg="+ Add Choice"
                />
                <Grid container spacing={2} style={{ padding: "2%" }}>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      overflowY: "scroll",
                      height: "75vh",
                    }}
                  >
                    <LoadTaskSteps
                      steps={choices}
                      title={'Choice'}
                      stepImages={choiceImages}
                      stepNames={choiceNames}
                      isHorizontal={isHorizontal}
                      removeStep={removeChoice}
                      updateStepImage={updateChoiceImage}
                      updateStepName={updateChoiceName}
                      deleteStepImageChange={deleteChoiceImageChange}
                      showCancel={true}
                      showTime={false}
                      stepTimes={[]}
                      label={'Choice Name'}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default ChoiceBoards;
