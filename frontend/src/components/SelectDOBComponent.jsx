import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const SelectDOBComponent = ({ label, value, onChange, error, helperText, width }) => {
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
    />
  );
};

export default SelectDOBComponent;
