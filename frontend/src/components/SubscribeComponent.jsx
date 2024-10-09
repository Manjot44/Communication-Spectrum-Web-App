import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import '../App.css'

const SubscribeComponent = ({ checked, onChange, label }) => {
    return (
        <>
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={onChange} />}
                label={label}
            />
        </>
    );
}

export default SubscribeComponent;
