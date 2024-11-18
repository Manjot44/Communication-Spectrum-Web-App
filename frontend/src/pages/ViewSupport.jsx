import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { CardContent, Button } from "@mui/material";
import "../App.css";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Grid from "@mui/material/Grid2";
import { getVisualSupportConfig } from '../components/VisualSupportConfig.jsx';
import { StepSupportWrapper, ViewSupportHeader, PrintBox, ViewSupportCard } from "../Wrappers.jsx";

function ViewSupport({ token }) {
	const { profileID } = useParams();
	const navigate = useNavigate();
	const [isHorizontal, setIsHorizontal] = useState(false);
	const contentRef = useRef(null);
	const reactToPrintFn = useReactToPrint({ contentRef });

	 // Pretend this is the Pre-Made Template (ACTUAL DATA WILL COME FROM API REQUEST)
	const testSupport = { text: 'How to banana', image: 'https://media.istockphoto.com/id/619046500/photo/bananas.jpg?s=612x612&w=0&k=20&c=p5-v1iKwhOhw5cFjfx83qgaZcOBSVpUuicZi4VIGF2Y=', steps: [ { id: 1 }, { id: 2 }], stepImages: [null, null], stepNames: ["hey", "bob"], stepTimes: [null, null], category: '' }
	// The Visual Suppport Type will be taken from the API request, then passed through
	const passInData = { state: getVisualSupportConfig("Task Analysis") , data: testSupport }

	// Toggle between horizontal and vertical step display
	const toggleComponentType = () => {
		setIsHorizontal((prev) => !prev);
		console.log(isHorizontal);
	};

	return (
		<>
			<Navbar profileID={profileID} />
			<StepSupportWrapper>
				<br/>
				<Grid container>
					<Grid item sx={{ width: '100%' }}>
						<ViewSupportCard>
							<CardContent>
								{/* Menu options */}
								<ViewSupportHeader variant="h6" gutterBottom>
									<b>Visual Support Title</b>
									<Button onClick={reactToPrintFn}>Print to PDF</Button>
									<Button onClick={toggleComponentType}>Toggle Visual Style</Button>
									<Button onClick={async () => {navigate(`/stepsupport/${profileID}`, { state: passInData } )}}>Edit Visual Support</Button>
								</ViewSupportHeader>
								{/* Box where visual support steps are printed out */}
								<PrintBox ref={contentRef}>
									Need API request to fetch the visual supports contents
								</PrintBox>
							</CardContent>
						</ViewSupportCard>
					</Grid>
				</Grid>
			</StepSupportWrapper>
		</>
	);
}

export default ViewSupport;
