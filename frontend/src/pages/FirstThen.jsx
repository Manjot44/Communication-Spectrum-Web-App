import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import '../App.css';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FirstStep from '../components/FirstStep';
import ThenStep from '../components/ThenStep';
import Arrow from '../components/Arrow';
import DropdownComponent from '../components/DropdownComponent';

function FirstThen({ token, setTokenFunc }) {
  const { profileID } = useParams();
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [imageFirst, setImageFirst] = useState(null);
  const [imageThen, setImageThen] = useState(null);
  const [value, setValue] = useState(dayjs());
  const [category, setCategory] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
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
          {/* Sidebar with Date, Category */}
          <Grid item xs={12} md={3}>
            <Card className="task-analyses-create-options" style={{ height: '87vh' }}>
              <CardContent>
                <Typography variant="h7" component="div" style={{ fontFamily: 'Poppins' }}>
                  <b>Select Task Date</b>
                </Typography>
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="d-flex align-items-center" style={{ height: '55vh', width: 'auto', backgroundColor: '#f0f0f0' }}>
                    <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} style={{ color: 'black', height: '37vh', width: 'auto' }} />
                  </div>
                </LocalizationProvider>
                <br />
                <Typography variant="h7" component="div" style={{ fontFamily: 'Poppins' }}>
                  <b>Select Task Category</b>
                </Typography>

                <div className="d-flex align-items-center" style={{ height: '75px', backgroundColor: 'white', padding: '5px', backgroundColor: '#f0f0f0' }}>
                  <DropdownComponent
                    id="category-dropdown"
                    label="Select Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    options={[
                      { value: 'Self-Care', label: 'Self-Care' },
                      { value: 'Routines', label: 'Routines' },
                      { value: 'School', label: 'School' },
                      { value: 'Work', label: 'Work' },
                      { value: 'Fun Activities', label: 'Fun Activities' },
                      { value: 'Emotional Regulation', label: 'Emotional Regulation' },
                      { value: 'Beliefs and Practices', label: 'Beliefs and Practices' },
                      { value: 'Health and Wellbeing', label: 'Health and Wellbeing' },
                      { value: 'Transport', label: 'Transport' },
                      { value: 'Events', label: 'Events' },
                      { value: 'Places', label: 'Places' },
                      { value: 'Other', label: 'Other' },
                    ]}
                    width="100%"
                  />
                </div>

                <br />
                <Button 
                  variant="contained"
                  style={{ width: '100%', backgroundColor: '#26c3ba', fontFamily: 'Poppins' }}
                >
                  Create Visual Support
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* First-Then Section */}
          <Grid item xs={12} md={9}>
            <Card className="task-analyses-create-options" style={{ backgroundColor: '#f0f0f0', height: '87vh' }}>
              <CardContent>
                <Typography variant="h5" component="div" style={{ fontFamily: 'Poppins' }}>
                  <Typography variant="h6" gutterBottom style={{ margin: '10px', fontFamily: 'Poppins', color: 'black', display: 'flex', justifyContent: 'space-between' }}>
                    {isEditing ? (
                      <input
                        type="text"
                        value={text}
                        onChange={handleTextChange}
                        onBlur={toggleEditing}
                        autoFocus
                      />
                    ) : (
                      <b onClick={toggleEditing} style={{ cursor: 'pointer' }}>
                        {text || <span style={{ color: 'grey', fontFamily: 'Poppins' }}>Insert Task Name Here</span>}
                      </b>
                    )}
                  </Typography>
                  <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <FirstStep image={imageFirst} setImage={setImageFirst} />
                    <Arrow />
                    <ThenStep image={imageThen} setImage={setImageThen} />
                  </div>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default FirstThen;
