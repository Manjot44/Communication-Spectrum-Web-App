import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const SelectDOBComponent = ({ label, value, onChange, error, helperText }) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      maxDate={dayjs()}
      renderInput={(params) => (
        <TextField {...params} error={error} helperText={helperText} />
      )}
    />
  );
};

export default SelectDOBComponent;
