import React, { useState } from "react";
import { Grid, Card, Typography, CardContent, Button } from "@mui/material";
import "../App.css";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import DropdownComponent from "../components/DropdownComponent";

function SelectDateCategoryComponent({ date, changeDate, category, changeCategory, handleCreate }) {
	return (
		<>
			<Card
				className="task-analyses-create-options"
				style={{ height: "87vh" }}
			>
				<CardContent>
					<Typography
						variant="h5"
						component="div"
						style={{ fontFamily: "Poppins" }}
					>
						<b>Select Task Date</b>
					</Typography>

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<div
							className="d-flex align-items-center"
							style={{ height: "55vh", width: "auto" }}
						>
							<DateCalendar
								value={date}
								onChange={changeDate}
							/>
						</div>
					</LocalizationProvider>
					<br />
					<Typography
						variant="h5"
						component="div"
						style={{ fontFamily: "Poppins" }}
					>
						<b>Select Task Category</b>
					</Typography>

					<div
						className="d-flex align-items-center"
						style={{
							height: "75px",
							backgroundColor: "white",
							padding: "5px",
						}}
					>
						<DropdownComponent
							id="country-form"
							label="Select Category"
							value={category}
							onChange={changeCategory}
							options={[
								{ value: "Self-Care", label: "Self-Care" },
								{ value: "Routines", label: "Routines" },
								{ value: "School", label: "School" },
								{ value: "Work", label: "Work" },
								{ value: "Fun Activities", label: "Fun Activities" },
								{
									value: "Emotional Regulation",
									label: "Emotional Regulation",
								},
								{
									value: "Beliefs and Practices",
									label: "Beliefs and Practices",
								},
								{
									value: "Health and Wellbeing",
									label: "Health and Wellbeing",
								},
								{ value: "Transport", label: "Transport" },
								{ value: "Events", label: "Events" },
								{ value: "Places", label: "Places" },
								{ value: "Other", label: "Other" },
							]}
							width="100%"
						/>
					</div>

					<br />
					<Button
						variant="contained"
						style={{
							width: "100%",
							backgroundColor: "#26c3ba",
							fontFamily: "Poppins",
						}}
						onClick={handleCreate}
					>
						Create Visual Support
					</Button>
				</CardContent>
			</Card>
		</>
	);
}

export default SelectDateCategoryComponent;
