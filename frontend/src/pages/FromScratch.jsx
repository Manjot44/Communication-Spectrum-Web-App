import React, { useState, useRef, useEffect } from "react";
import { Grid, Card, Typography, CardContent, Button, Box, TextField, Modal, Grid2 } from "@mui/material";
import Navbar from "../components/Navbar.jsx";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import SelectDateCategoryComponentCreate from "../components/SelectDateCategoryComponentCreate.jsx";
import TaskHeaderScratch from "../components/TaskheaderScratch.jsx";
import { useReactToPrint } from "react-to-print";
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

function FromScratch({ token }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { profileID } = useParams();
  const [text, setText] = useState(state?.text || "");
  const [image, setImage] = useState(state?.image || null);
  const [category, setCategory] = useState(state?.category || "");
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [elementsImages, setElementsImages] = useState([]);
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState();

  // Add a new text box at a default position
  const addBox = (style = 'body') => {
    setBoxes([
      ...boxes,
      {
        id: boxes.length,
        type: 'text',
        x: 100,
        y: 100,
        width: 150,
        height: 50,
        content: `Box ${boxes.length + 1}`,
        isEditing: false,
        isResizing: false,
        style,
        font: '',
        colour: '',
      },
    ]);
  };

  // Trigger file selection dialog
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Function to handle file selection and add image element
  const addElementImage = (event) => {
    const files = Array.from(event.target.files);

    const newImage = files.map((file) => ({
      id: boxes.length,
      type: 'image',
      x: 100,
      y: 100,
      width: 150,
      height: 150,
      content: URL.createObjectURL(file),
      isEditing: false,
      isResizing: false,
      font: '',
      colour: '',
    }));

    setBoxes((prevBoxes) => [...prevBoxes, ...newImage]);
  };

  // Toggle edit mode for boxes or images
  const toggleEditMode = (id, type) => {
    setBoxes(
      boxes.map((box) =>
        box.id === id ? { ...box, isEditing: !box.isEditing } : box
      )
    );
  };

  // Update the text of the box
  const updateBoxText = (id, newText) => {
    setBoxes(
      boxes.map((box) =>
        box.id === id ? { ...box, content: newText } : box
      )
    );
  };

  // Update the position of a box
  const updateBoxPosition = (id, data) => {
    const updatedBoxes = boxes.map((box) =>
      box.id === id ? { ...box, x: data.x, y: data.y } : box
    );
    setBoxes(updatedBoxes);
  };

  // Update the size of a box
  const updateBoxSize = (id, width, height) => {
    const updatedBoxes = boxes.map((box) =>
      box.id === id ? { ...box, width, height } : box
    );
    setBoxes(updatedBoxes);
  };

  const updateBoxFontSize = (size) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === selectedElement ? { ...box, font: size } : box
      )
    );
  };
  
  const updateBoxFontColour = (colour) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === selectedElement ? { ...box, colour: colour } : box
      )
    );
  };

  // Function that triggers on an onClick event and opens the modal
  const handleOpenModal = (box) => {
    console.log(boxes);
    setSelectedElement(box.id);
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const handleCloseModal = (box) => {
    console.log(boxes);
    setIsModalOpen(false);
  };
  

  const handleResizingStart = (box) => {
    setSelectedElement(box.id)
    console.log(boxes);
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === selectedElement ? { ...box, isResizing: true } : box
      )
    );
    console.log(boxes);
  };

  const handleResizingStop = () => {
    // setSelectedElement(null)
    console.log(">>>> handleResizingStop before");
    console.log(boxes);
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === selectedElement ? { ...box, isResizing: false } : box
      )
    );
    console.log(">>>> handleResizingStop after");
    console.log(boxes);
  };

  useEffect (() => {
    console.log(`>>>boxes update ${boxes}`);
  }, [boxes]);

  // Create a new visual support
  // const handleCreate = async () => {
  //   if (text.trim() === "") {
  //     setNameError(true);
  //     return;
  //   }
  //   try {
  //     await axios.post(
  //       `http://localhost:5005/new_support_scratch/${profileID}`,
  //       {
  //         text,
  //         image,
  //         date,
  //         boxes,
  //         category,
  //         isHorizontal,
  //       },
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );
  //     navigate(`/home/${profileID}`);
  //   } catch (err) {
  //     alert(err.response.data.error);
  //   }
  // };

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <>
      <Navbar profileID={profileID} />
      <br />
      <div className="page-wrapper-style" style={{ padding: "0 1%" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <SelectDateCategoryComponentCreate
              date={date}
              changeDate={(newDate) => setDate(newDate)}
              category={category}
              changeCategory={(e) => setCategory(e.target.value)}
              // handleCreate={handleCreate}
              image={image}
              setImage={(image) => setImage(image)}
              addBox={addBox}
              addElementImage={addElementImage}
              handleButtonClick={handleButtonClick}
              fileInputRef={fileInputRef}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Card className="task-analyses-create-options" style={{ height: "87vh" }}>
              <CardContent>
                <Typography variant="h5" component="div" style={{ fontFamily: "Poppins" }}>
                  <TaskHeaderScratch
                    text={text}
                    setText={setText}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    nameError={nameError}
                    setNameError={setNameError}
                    defaultText="Insert Task Name"
                    errorMsg="Please enter a task name"
                    reactToPrintFn={reactToPrintFn}
                  />
                  <Box sx={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: '#f9f9f9', p: 2 }}>
                    <Modal
                      open={isModalOpen}
                      onClose={handleCloseModal}
                      aria-labelledby="modal-title"
                      aria-describedby="modal-description"
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 300,
                          bgcolor: "background.paper",
                          boxShadow: 24,
                          p: 4,
                        }}
                      >
                        <Typography id="modal-title" variant="h6" component="h2">
                          Edit text
                        </Typography>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                          Font size
                        </Typography>
                        <TextField
                          type="text"
                          onChange={(e) => updateBoxFontSize(e.target.value)}
                          fullWidth
                          sx={{ mt: 1 }}
                        />
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                          Font colour
                        </Typography>
                        <TextField
                          type="color"
                          onChange={(e) => updateBoxFontColour(e.target.value)}
                          fullWidth
                          sx={{ mt: 1 }}
                        />
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                        </Typography>
                        <Button onClick={handleCloseModal}>Close</Button>
                      </Box>
                    </Modal>

                    {boxes.map((box) => (
                      <Draggable
                        key={box.id}
                        defaultPosition={{ x: box.x, y: box.y }}
                        onStop={(e, data) => updateBoxPosition(box.id, data)}
                        disabled={box.isResizing}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            border: '1px solid #1976d2',
                            borderRadius: 1,
                            // backgroundColor: '#e3f2fd',
                            padding: 1,
                            width: box.width,
                            height: box.height,
                          }}
                          onClick={() => toggleEditMode(box.id)}
                        >
                          {/* <div
                            style={{ backgroundColor: 'red' }}
                          >
                            dsfhdkshfdskjh
                          </div> */}
                          <ResizableBox
                            width={box.width}
                            height={box.height}
                            minConstraints={[100, 100]}
                            maxConstraints={[500, 500]}
                            onResizeStart={() => handleResizingStart(box)}
                            onResizeStop={(e, { size }) => {
                              handleResizingStop();
                              updateBoxSize(box.id, size.width, size.height);
                            }}
                            // style={{ backgroundColor: 'blue' }}
                          >
                            {
                              box.type !== 'image' ? (
                                box.isEditing ? (
                                  <TextField
                                    autoFocus
                                    value={box.content}
                                    onChange={(e) => updateBoxText(box.id, e.target.value)}
                                    onBlur={() => toggleEditMode(box.id, 'text')}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") toggleEditMode(box.id, 'text');
                                    }}
                                    size="small"
                                    fullWidth
                                  />
                                ) : (
                                  <Typography
                                    variant={box.style === 'body' ? "h5" : "h3"}
                                    sx={{
                                      fontSize: box.font !== "" ? `${box.font}px` : undefined, // Apply box.font if it's not empty
                                      color: box.colour !== "" ? `${box.colour}` : undefined, // Apply box.colour if it's not empty
                                    }}
                                  >
                                    {box.content}
                                  </Typography>
                                )
                              ) : (
                                <img
                                  src={box.content}
                                  alt={`Element ${box.id}`}
                                  style={{ width: '100%', height: '100%' }}
                                />
                              )
                            }
                          </ResizableBox>
                          <Grid2 container spacing={1}>
                            <Grid2 item xs={6}>
                              <div
                                style={{ 
                                  backgroundColor: 'grey',
                                  height: '10px',
                                  width: '10px'
                                }}
                                onClick={() => handleOpenModal(box)}
                              >
                              </div>

                            </Grid2>
                            <Grid2 item xs={6}>
                              <div
                                style={{ 
                                  backgroundColor: 'orange',
                                  height: '10px',
                                  width: '10px'
                                }}
                                onClick={() => handleResizingStop()}
                              >
                              </div>

                            </Grid2>
                          </Grid2>
                        </Box>
                      </Draggable>
                    ))}
                  </Box>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default FromScratch;
