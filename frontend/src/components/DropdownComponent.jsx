import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../App.css'

const DropdownComponent = ({ id, label, value, onChange, options }) => {
  return (
    <>
      <FormControl style={{ width: '75%' }}>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={id}
          value={value}
          label={label}
          onChange={onChange}
        >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
        ))}
        </Select>
      </FormControl>
    </>
  );
};

export default DropdownComponent;
