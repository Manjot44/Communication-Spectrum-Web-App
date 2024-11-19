import React from "react";
import { Typography, CardContent, Stack, Checkbox } from "@mui/material";
import "../App.css";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import DropdownComponent from "../components/DropdownComponent";
import { DatePicker } from "@mui/x-date-pickers";
import VisualSupportImage from "./VisualSupportImage";
import { LeftMenuCard, CreateSupportButton } from "../Wrappers";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function SelectDateCategoryComponent({
  token,
  date,
  changeDate,
  category,
  changeCategory,
  handleCreate,
  image,
  setImage,
  showCategory,
  setIsPublic
}) {
  return (
    <>
      <LeftMenuCard>
        <CardContent>
          <Stack spacing={1.2}>
            <Typography
              variant="h5"
              style={{ fontFamily: "Poppins" }}
            >
              <b>Select Date</b>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={date}
                onChange={changeDate}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
            <Typography
              variant="h5"
              style={{ fontFamily: "Poppins" }}
            >
              <b>Select Thumbnail</b>
            </Typography>
            <div>
              <VisualSupportImage
                token={token}
                image={image}
                setImage={setImage}
                uniqueID={-1}
                imgHeight={"35vh"}
                deleteImage={() => setImage(null)}
              />
            </div>
            {showCategory && (
              <>
                <Typography
                  variant="h5"
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
              </>
            )}
            
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Make Visual Support Public"
                onChange={setIsPublic}
              />
            </FormGroup>

            <CreateSupportButton variant="contained" onClick={handleCreate}>
              Create Visual Support
            </CreateSupportButton>
          </Stack>
        </CardContent>
      </LeftMenuCard>
    </>
  );
}

export default SelectDateCategoryComponent;
