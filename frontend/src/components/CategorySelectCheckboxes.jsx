import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid2'

function CategorySelectCheckboxes ({}) {
	return (
		<>
		<Grid container spacing={1}>
			<Grid item xs={12} md={6} style={{ width: '40%' }}>
				<FormGroup>
					<FormControlLabel control={<Checkbox style={{ color: 'white'}} />} label="Self-Care" />
					<FormControlLabel control={<Checkbox style={{ color: 'white'}} />} label="Routines" />
					<FormControlLabel control={<Checkbox style={{ color: 'white'}} />} label="School" />
					<FormControlLabel control={<Checkbox style={{ color: 'white'}} />} label="Work" />
					<FormControlLabel control={<Checkbox style={{ color: 'white'}} />} label="Fun Activities" />
					<FormControlLabel control={<Checkbox style={{ color: 'white'}} />} label="Emotional Regulation" />
				</FormGroup>
			</Grid>
			<Grid item xs={12} md={6} style={{ width: '40%', color: 'white' }}>
				<FormGroup>
					<FormControlLabel control={<Checkbox style={{ color: 'white'}}/>} label="Beliefs and Practices" />
					<FormControlLabel control={<Checkbox style={{ color: 'white'}} />} label="Health and Wellbeing" />
					<FormControlLabel control={<Checkbox style={{ color: 'white'}} />} label="Transport" />
					<FormControlLabel control={<Checkbox style={{ color: 'white'}} />} label="Events" />
					<FormControlLabel control={<Checkbox style={{ color: 'white'}} />} label="Places" />
					<FormControlLabel control={<Checkbox style={{ color: 'white'}} />} label="Other" />
				</FormGroup>
			</Grid>
		</Grid>
		</>
	);
}

export default CategorySelectCheckboxes;
