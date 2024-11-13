import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, CardContent, Button } from "@mui/material";
import "../App.css";
import axios from "axios";
import dayjs from "dayjs";
import SelectDateCategoryComponent from "../components/SelectDateCategoryComponent.jsx";
import LoadTaskSteps from "../components/LoadTaskSteps.jsx";
import TaskHeader from "../components/Taskheader.jsx";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Grid from "@mui/material/Grid2"
import Box from "@mui/material/Box";

function ViewSupport({}) {
	const { profileID } = useParams();

	return (
		<>
			<Navbar profileID={profileID} />
			<div class='page-wrapper-style' style={{ padding: '0 1%' }}>
				<br/>
				<Grid container>
					<Grid item sx={{ width: '100%' }}>
						<Card sx={{ backgroundColor: 'white', height: '87vh', width: '100%' }}>
							<CardContent>
								Need API request to fetch the visual supports contents
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</div>
		</>
	);
}

export default ViewSupport;
