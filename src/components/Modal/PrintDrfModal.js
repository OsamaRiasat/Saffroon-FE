import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PrintIcon from "@material-ui/icons/Print";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";

import GridItem from "../Grid/GridItem";
import GridContainer from "../Grid/GridContainer.js";
import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";

export default function PrintDrfModal() {
	const [open, setOpen] = React.useState(false);
	const [fullWidth, setFullWidth] = React.useState(true);
	const [maxWidth, setMaxWidth] = React.useState("md");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				fullWidth="true"
				startIcon={<PrintIcon />}
				onClick={handleClickOpen}
			>
				Print DRF/Copy
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				fullWidth={fullWidth}
				maxWidth={maxWidth}
				aria-labelledby="max-width-dialog-title"
			>
				<DialogTitle id="max-width-dialog-title">
					Dispensation Request Form
				</DialogTitle>
				<DialogContent>
					<Card>
						<CardContent>
							<GridContainer>
								<GridItem xs={12} sm={12} md={3}>
									<TextField
										id="drf-no"
										label="DRF No:"
										fullWidth="true"
										variant="outlined"
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={3}>
									<TextField
										id="drf-date"
										// label="Date:"
										fullWidth="true"
										variant="outlined"
										type="date"
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={3}>
									<TextField
										id="drf-product"
										label="Product:"
										fullWidth="true"
										variant="outlined"
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={3}>
									<TextField
										id="drf-batch-no"
										label="Batch No:"
										fullWidth="true"
										variant="outlined"
									/>
								</GridItem>
							</GridContainer>
						</CardContent>
					</Card>

					<Card>
						<CardHeader color="primary">
							<h4>Required Materials</h4>
						</CardHeader>
						<CardContent>
							<GridContainer>
								<GridItem xs={12} sm={12} md={4}>
									<TextField
										id="required-code-no"
										select
										label="Code No:"
										fullWidth="true"
										variant="outlined"
									></TextField>
								</GridItem>
							</GridContainer>

							<GridContainer>
								<GridItem xs={8} sm={8} md={8}>
									<TextField
										id="required-material"
										select
										label="Material:"
										fullWidth="true"
										variant="outlined"
									></TextField>
								</GridItem>

								<GridItem xs={12} sm={12} md={3}>
									<TextField
										id="required-unit"
										select
										label="Unit:"
										fullWidth="true"
										variant="outlined"
									></TextField>
								</GridItem>
							</GridContainer>

							<GridContainer>
								<GridItem xs={12} sm={12} md={4}>
									<TextField
										id="required-formula-qty"
										label="Formula Qty:"
										fullWidth="true"
										variant="outlined"
									></TextField>
								</GridItem>

								<GridItem xs={12} sm={12} md={4}>
									<TextField
										id="required-additional-qty"
										label="Additional Qty:"
										fullWidth="true"
										variant="outlined"
									></TextField>
								</GridItem>
							</GridContainer>
						</CardContent>
					</Card>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" color="primary" onClick={handleClose}>
						Add
					</Button>
					<Button variant="contained" color="primary" onClick={handleClose}>
						Post
					</Button>
					<Button variant="contained" color="primary" onClick={handleClose}>
						Duplicate Copy
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
