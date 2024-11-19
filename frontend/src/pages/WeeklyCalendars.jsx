import React, { useState, useRef, createContext } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Grid, Typography, Card, CardContent } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";
import dayjs from 'dayjs';
import Navbar from '../components/Navbar';
import SelectDateCategoryComponent from '../components/SelectDateCategoryComponent';
import WeeklyCalendarComponent from '../components/WeeklyCalendarComponent';
import ChangeColourModal from '../components/ChangeColourModal';
import TaskHeader from '../components/Taskheader';
import { useReactToPrint } from 'react-to-print';

export const context = createContext(null);
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function WeeklyCalendars({ token }) {
  const { profileID } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  // Destructure data from state
  const data = state?.data;
  const [date, setDate] = useState(dayjs(data?.date) || dayjs());
  const [tasks, setTasks] = useState(data?.wkly_tasks || 
    {
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  }); // Unified state for all tasks
  const [text, setText] = useState(data?.title || "");
  const [isHorizontal, setIsHorizontal] = useState(data?.layout || false);
  const [stepColour, setStepColour] = useState(data?.step_colour || '#000CA4');
  const [fontColour, setFontColour] = useState(data?.font_colour || 'white');
  const [image, setImage] = useState(data?.title_img || null);

  const [isEditing, setIsEditing] = useState(false);
  const [colourModal, setColourModal] = useState(false);
  const [nameError, setNameError] = useState(false);

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const formatDayWithDate = (dayIndex) => {
    if (date) {
      return date.add(dayIndex, 'day').format('ddd DD/MM');
    }
    return '';
  };

  const handleAddTask = (day) => {
    const newTask = { id: `${day}-${Date.now()}`, name: "", image: null };
    setTasks((prev) => ({
      ...prev,
      [day]: [...prev[day], newTask],
    }));
  };

  const handleRemoveTask = (day, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [day]: prev[day].filter((task) => task.id !== taskId),
    }));
  };

  const updateTask = (day, taskId, key, value) => {
    setTasks((prev) => ({
      ...prev,
      [day]: prev[day].map((task) =>
        task.id === taskId ? { ...task, [key]: value } : task
      ),
    }));
  };

  const onMoveLeft = (day, index) => {
    setTasks((prev) => {
      if (index === 0) return prev;
      const dayTasks = [...prev[day]];
      [dayTasks[index - 1], dayTasks[index]] = [dayTasks[index], dayTasks[index - 1]];
      return {
        ...prev,
        [day]: dayTasks,
      };
    });
  };
  
  const onMoveRight = (day, index) => {
    setTasks((prev) => {
      if (index === prev[day].length - 1) return prev;
      const dayTasks = [...prev[day]];
      [dayTasks[index + 1], dayTasks[index]] = [dayTasks[index], dayTasks[index + 1]];
      return {
        ...prev,
        [day]: dayTasks,
      };
    });
  };

  const toggleComponentType = () => {
    setIsHorizontal((prev) => !prev);
  };

  const toggleColourModal = () => {
    setColourModal((prev) => !prev);
  };

  const handleCreate = async () => {
    if (text.trim() === "") {
      setNameError(true);
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
          wkly_tasks: tasks,
          isHorizontal,
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Navbar profileID={profileID}/>
      <div className="page-wrapper-style" style={{ padding: "0 1%" }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: "Poppins" }}>
          <b>Week starting {date.format('DD/MM/YYYY')}</b>
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <SelectDateCategoryComponent
              token={token}
              date={date}
              changeDate={(newDate) => setDate(newDate)}
              handleCreate={handleCreate}
              image={image}
              setImage={(newImage) => setImage(newImage)}
              showCategory={false}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Card style={{ height: "87vh" }}>
              <CardContent>
                <TaskHeader
                  text={text}
                  setText={setText}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  nameError={nameError}
                  setNameError={setNameError}
                  toggleComponentType={toggleComponentType}
                  defaultText={"Insert Weekly Calendar Name Here"}
                  reactToPrintFn={reactToPrintFn}
                  setColourModal={toggleColourModal}
                />
                <Grid container spacing={2} style={{ padding: "2%" }}>
                  <Grid item xs={12}>
                    <div
                      ref={contentRef}
                      style={{
                        display: "flex",
                        flexDirection: isHorizontal ? "row" : "column",
                        flexWrap: "nowrap",
                        height: "75vh",
                        overflowY: isHorizontal ? "hidden" : "scroll",
                        overflowX: isHorizontal ? "scroll" : "hidden",
                        gap: isHorizontal ? "20px" : "10px", 
                      }}
                    >
                      {daysOfWeek.map((day, index) => (
                        <context.Provider value={{
                          fontColour: fontColour,
                          stepColour: stepColour,
                          showCancel: true,
                          showTime: false,
                          label: "Task Name",
                          totalSteps: tasks[day].length
                        }}>
                          <WeeklyCalendarComponent
                            token={token}
                            key={day}
                            day={day}
                            tasks={tasks[day]} // Pass tasks for the specific day
                            addTask={() => handleAddTask(day)}
                            removeTask={handleRemoveTask}
                            updateTask={updateTask}
                            moveLeft={onMoveLeft}
                            moveRight={onMoveRight}
                            layout={isHorizontal}
                            stepColour={stepColour}
                            fontColour={fontColour}
                            title={formatDayWithDate(index)}
                          />
                        </context.Provider>
                      ))}
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <ChangeColourModal
        open={colourModal}
        onClose={toggleColourModal}
        setStepColour={setStepColour}
        setFontColour={setFontColour}
      />
    </LocalizationProvider>
  );
}

export default WeeklyCalendars;
