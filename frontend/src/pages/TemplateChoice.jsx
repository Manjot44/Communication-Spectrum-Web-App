import '../App.css'
import React from 'react';
import Navbar from "../components/Navbar";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TemplateChoiceCard from '../components/TemplateChoiceCard';

function TemplateChoice({ token }) {
  const { profileID } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  // const supportType = { type: state.category, link: state.temp };

  const getMakeEmpty = (category) => {
    switch (category) {
      case "First-Then":
        return { text: '', image: '', imageFirst: '', imageThen: '', firstName: '', thenName: '', category: '' };
      default:
        return { text: '', image: '', steps: [], stepImages: [], stepNames: [], stepTimes: [], category: '' };
    }
  };
  
  const makeEmpty = getMakeEmpty(state.type);
  const supportType = { state: state, data: makeEmpty };

  return (
    <>
      <Navbar profileID={profileID}/>
      <div class="page-wrapper-style">
        <br />
        <Typography 
					variant="h3" 
					align="center" 
					gutterBottom 
					style={{ 
						fontFamily: "Poppins", 
						color: "#000CA4" 
					}}
				>
          <b>{state.title}</b>
        </Typography>
        <br />
        <Grid 
          container
          spacing={4}
          justifyContent="space-evenly"
          style={{ height: '60vh' }}
        >
          <Grid item xs={12} sm={4}>
            <TemplateChoiceCard
              TemplateType="Create From Scratch"
              TemplateDesc="Create your visual support from scratch."
              IconComponent={LibraryAddIcon}
							NavigateTo={async () => {navigate(state.scratch, { state: state })}}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TemplateChoiceCard
              TemplateType="Create From Template"
              TemplateDesc="Create a visual support using your own images and text with a structured template."
              IconComponent={DashboardIcon}
              NavigateTo={async () => {navigate(state.temp, { state: supportType })}}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TemplateChoiceCard
              TemplateType="Create From Existing Template"
              TemplateDesc="Use one of our pre-made templates to help create your visual support."
              IconComponent={ImageSearchIcon}
							NavigateTo={async () => {navigate(state.exist, { state: supportType })}}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default TemplateChoice;
