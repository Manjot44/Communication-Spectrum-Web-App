import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { TextField } from "@mui/material";

const SelectDOBComponent = ({ label, value, onChange, error, helperText, width, disabled }) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      maxDate={dayjs()}
      renderInput={(params) => (
        <TextField {...params} error={error} helperText={helperText} />
      )}
      sx={{ width: `${width}` }}
      disabled={disabled}
    />
  );
};

export default SelectDOBComponent;
