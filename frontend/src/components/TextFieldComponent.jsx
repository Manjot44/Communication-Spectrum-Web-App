import TextField from "@mui/material/TextField";
import "../App.css";

const TextFieldComponent = ({
  label,
  value,
  onChange,
  onKeyDown,
  type,
  error,
  helperText,
}) => {
  return (
    <>
      <TextField
        className="login-input-box"
        label={label}
        variant="outlined"
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        error={error}
        helperText={helperText}
      />
    </>
  );
};

export default TextFieldComponent;
