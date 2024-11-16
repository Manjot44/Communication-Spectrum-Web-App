import React, { useState } from "react";
import { Grid, Card, Typography, CardContent, Button } from "@mui/material";
import "../App.css";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import DropdownComponent from "./DropdownComponent";
import { DatePicker } from "@mui/x-date-pickers";
import VisualSupportImage from "./VisualSupportImage";
import AddIcon from '@mui/icons-material/Add';
import ScratchElementImage from "../components/ScratchElementImage.jsx";

function SelectDateCategoryComponentCreate({
  date,
  changeDate,
  category,
  changeCategory,
  // handleCreate,
  image,
  setImage,
  addBox,
  addElementImage,
  handleButtonClick,
  fileInputRef
}) {
  return (
    <>
      <Card className="task-analyses-create-options" style={{ height: "88vh" }}>
        <CardContent
          style={{
            height: "100%",      // Ensures the container takes the full height of the Card
            overflowY: "auto",   // Enables vertical scrolling for overflow content
            padding: "16px"      // Optional padding
          }}          
        >
          <Typography
            variant="h8"
            component="div"
            style={{ fontFamily: "Poppins" }}
          >
            <b>Select Date</b>
          </Typography>
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={date}
              onChange={changeDate}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
          <br />
          <br />
          <Typography
            variant="h8"
            component="div"
            style={{ fontFamily: "Poppins" }}
          >
            <b>Select Thumbnail</b>
          </Typography>
          <br />
          <VisualSupportImage
            image={image}
            setImage={setImage}
            uniqueID={-1}
            imgHeight={"35vh"}
            deleteImage={() => setImage(null)}
          />
          <br />
          <Typography
            variant="h8"
            component="div"
            style={{ fontFamily: "Poppins" }}
          >
            <b>Select Category</b>
          </Typography>
          <div
            className="d-flex align-items-center"
            style={{
              height: "75px",
              backgroundColor: "white",
              padding: "5px",
            }}
          >
            <DropdownComponent
              id="country-form"
              label="Select Category"
              value={category}
              onChange={changeCategory}
              options={[
                { value: "Self-Care", label: "Self-Care" },
                { value: "Routines", label: "Routines" },
                { value: "School", label: "School" },
                { value: "Work", label: "Work" },
                { value: "Fun Activities", label: "Fun Activities" },
                {
                  value: "Emotional Regulation",
                  label: "Emotional Regulation",
                },
                {
                  value: "Beliefs and Practices",
                  label: "Beliefs and Practices",
                },
                {
                  value: "Health and Wellbeing",
                  label: "Health and Wellbeing",
                },
                { value: "Transport", label: "Transport" },
                { value: "Events", label: "Events" },
                { value: "Places", label: "Places" },
                { value: "Other", label: "Other" },
              ]}
              width="100%"
            />
          </div>

          <Button
            variant="contained"
            style={{
              width: "100%",
              backgroundColor: "#26c3ba",
              fontFamily: "Poppins",
            }}
            // onClick={handleCreate}
          >
            Create Visual Support
          </Button>
        </CardContent>
      </Card>

    </>
  );
}

export default SelectDateCategoryComponentCreate;
