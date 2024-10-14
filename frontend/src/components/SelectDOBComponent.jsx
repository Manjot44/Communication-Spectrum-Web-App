import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import '../App.css'

const SelectDOBComponent = ({ label, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className='login-input-box'
        label={label}
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
}

export default SelectDOBComponent;
