import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid2'

function CategorySelectCheckboxes ({
	setSelfCare,
	setRoutine,
	setSchool,
	setWork,
	setFun,
	setEmotion,
	setBelief,
	setHealth,
	setTransport,
	setEvent,
	setPlace,
	setOther
}) {
	return (
		<>
		<Grid container spacing={1}>
			<Grid item xs={12} md={6} style={{ width: '40%' }}>
				<FormGroup>
					<FormControlLabel control={<Checkbox style={{ color: '#000CA4'}} />} label="Self-Care" onChange={setSelfCare}/>
					<FormControlLabel control={<Checkbox style={{ color: '#000CA4'}} />} label="Routines" onChange={setRoutine}/>
					<FormControlLabel control={<Checkbox style={{ color: '#000CA4'}} />} label="School" onChange={setSchool}/>
					<FormControlLabel control={<Checkbox style={{ color: '#000CA4'}} />} label="Work" onChange={setWork}/>
					<FormControlLabel control={<Checkbox style={{ color: '#000CA4'}} />} label="Fun Activities" onChange={setFun}/>
					<FormControlLabel control={<Checkbox style={{ color: '#000CA4'}} />} label="Emotional Regulation" onChange={setEmotion}/>
				</FormGroup>
			</Grid>
			<Grid item xs={12} md={6} style={{ width: '40%' }}>
				<FormGroup>
					<FormControlLabel control={<Checkbox style={{ color: '#000CA4'}}/>} label="Beliefs and Practices" onChange={setBelief} />
					<FormControlLabel control={<Checkbox style={{ color: '#000CA4'}} />} label="Health and Wellbeing" onChange={setHealth} />
					<FormControlLabel control={<Checkbox style={{ color: '#000CA4'}} />} label="Transport" onChange={setTransport} />
					<FormControlLabel control={<Checkbox style={{ color: '#000CA4'}} />} label="Events" onChange={setEvent} />
					<FormControlLabel control={<Checkbox style={{ color: '#000CA4'}} />} label="Places" onChange={setPlace} />
					<FormControlLabel control={<Checkbox style={{ color: '#000CA4'}} />} label="Other" onChange={setOther} />
				</FormGroup>
			</Grid>
		</Grid>
		</>
	);
}

export default CategorySelectCheckboxes;
