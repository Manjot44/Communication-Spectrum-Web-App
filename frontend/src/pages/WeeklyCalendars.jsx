import React, { useState } from 'react';
import { Grid, Typography, MenuItem, Select, FormControl, InputLabel, Box, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Navbar from '../components/Navbar';
import WeeklyCalendarComponent from '../components/WeeklyCalendarComponent'; // Import the new component
import { useParams } from "react-router-dom";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function WeeklyCalendars({ token, setTokenFunc }) {
  const { profileID } = useParams();
  const [layout, setLayout] = useState('vertical'); // Default to vertical layout
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleLayoutChange = (event) => {
    setLayout(event.target.value);
  };

  const formatDateRange = (start, end) => {
    if (start && end) {
      return `Week starting from ${start.format('DD/MM/YYYY')} - ${end.format('DD/MM/YYYY')}`;
    }
    return '';
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Navbar profileID={profileID}/>
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h3" align="center" gutterBottom>
          Weekly Calendars
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <FormControl variant="outlined" sx={{ minWidth: 120, marginRight: '20px' }}>
            <InputLabel id="layout-select-label">Layout</InputLabel>
            <Select
              labelId="layout-select-label"
              value={layout}
              onChange={handleLayoutChange}
              label="Layout"
            >
              <MenuItem value="vertical">Vertical</MenuItem>
              <MenuItem value="horizontal">Horizontal</MenuItem>
            </Select>
          </FormControl>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        {startDate && endDate && (
          <Typography variant="h6" align="center" gutterBottom>
            {formatDateRange(startDate, endDate)}
          </Typography>
        )}
        <Grid container spacing={2} justifyContent="space-evenly">
          {daysOfWeek.map((day) => (
            <Grid item key={day} xs={12} sm={layout === 'vertical' ? 12 : 1}>
              <WeeklyCalendarComponent day={day} layout={layout} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}

export default WeeklyCalendars;