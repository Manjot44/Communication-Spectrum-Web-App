import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import { useParams, useLocation } from "react-router-dom";
import {
  Grid,
  Card,
  Typography,
  CardContent,
} from "@mui/material";
import dayjs from 'dayjs';
import '../App.css';
import Arrow from '../components/Arrow';
import SelectDateCategoryComponent from '../components/SelectDateCategoryComponent';
import EditTitleComponent from '../components/EditTitleComponent';
import ChoiceBoardStep from '../components/ChoiceBoardStep';

function FirstThen({ token, setTokenFunc }) {
  const { profileID } = useParams();
  const { state } = useLocation();
  const [text, setText] = useState(state.text);
  const [image, setImage] = useState(state.image);
  const [imageFirst, setImageFirst] = useState(state.imageFirst);
  const [imageThen, setImageThen] = useState(state.imageThen);
  const [firstName, setFirstname] = useState(state.firstName);
  const [thenName, setThenName] = useState(state.thenName);
  const [category, setCategory] = useState(state.category);
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [nameError, setNameError] = useState(false);

  const handleCreate = async () => {
    if (text.trim() === "") {
      setNameError(true); // Set error state if no name is entered
      return;
    }
    // ADD PUT REQUEST HERE
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
                        image={imageFirst}
                        index="First"
                        setName={(newName) => setFirstname(newName)}
                        setImage={(imageFirst) => setImageFirst(imageFirst)}
                        label="First Step"
                        showCancel={false}
                      />
                      <Arrow style={{ width: '20px' }}/>
                      <ChoiceBoardStep
                        image={imageThen}
                        index="Then"
                        setName={(newName) => setThenName(newName)}
                        setImage={(imageThen) => setImageThen(imageThen)}
                        label="Then Step"
                        showCancel={false}
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
