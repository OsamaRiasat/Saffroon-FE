import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PrintIcon from "@material-ui/icons/Print";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import GridItem from "../Grid/GridItem";
import GridContainer from "../Grid/GridContainer.js";
import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import Button from "../CustomButtons/Button.js";
import AlertModal from "./AlertModal.js";

import { getHighestDRFNo, postDRFView } from "../../Services/QA/Change_Control";
import {
	RawMaterialNames,
	RawMaterialCodes,
	RawMaterialSearchByName,
	RawMaterialSearchByRMCode
} from "../../Services/Inventory/inventory.js";

export default function PrintDrfModal(props) {
	console.log(props);
	const [open, setOpen] = React.useState(false);
	const [fullWidth, setFullWidth] = React.useState(true);
	const [maxWidth, setMaxWidth] = React.useState("md");
	const [date, setDate] = useState();
	const [highestDrf, setHighestDrf] = useState(0);
	const [materialList, setMaterialList] = useState([]);
	const [inputMaterial, setInputMaterial] = useState("");
	const [selectedMaterial, setSelectedMaterial] = useState("");
	const [materialCodes, setMaterialCodes] = useState([]);
	const [inputMaterialCode, setInputMaterialCode] = useState("");
	const [selectedMaterialCode, setSelectedMaterialCode] = useState("");
	const [unit, setUnit] = useState("");
	const [formulaQuantity, setFormulaQuantity] = useState("");
	const [additionalQuantity, setAdditionalQuantity] = useState("");
	const [drfCart, setDrfCart] = useState([]);
	const [showSuccess, setShowSuccess] = useState(false);
	const [message, setMessage] = useState();
	const [success, setSuccess] = useState();

	useEffect(() => {
		// if(highestDrf == 0) {
		getHighestDRFNo();
		// }
		getMaterialListAndCode();
	}, []);

	const getHighestDRFNo = async () => {
		const hdrf = (await getHighestDRFNo()).data;
		setHighestDrf(hdrf.DRFNo1);
	};

	const getMaterialListAndCode = async () => {
		const resMaterialName = (await RawMaterialNames()).data;
		setMaterialList(resMaterialName);

		const resMaterialCodes = (await RawMaterialCodes()).data;
		setMaterialCodes(resMaterialCodes);
	};

	const getMaterialCodes = async name => {
		if (name != "") {
			const resMaterialCodes = (await RawMaterialSearchByName(name)).data;
			setInputMaterial(name);
			setSelectedMaterial(name);
			setInputMaterialCode(resMaterialCodes.RMCode);
			setUnit(resMaterialCodes.Units);
		}
	};

	const getMaterialName = async code => {
		if (code != "") {
			const resMaterialName = (await RawMaterialSearchByRMCode(code)).data;
			setInputMaterialCode(code);
			setSelectedMaterialCode(code);
			setInputMaterial(resMaterialName[0]?.Material);
			setUnit(resMaterialName[0]?.Units);
		}
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setDrfCart([]);
		setDate();
		setInputMaterial();
		setInputMaterialCode();
		setUnit();
		setFormulaQuantity();
		setAdditionalQuantity();
		setOpen(false);
	};

	const handleAdd = async () => {
		if (drfCart.demandedItems == undefined) {
			let data = {
				ProductCode: props.product,
				BatchNo: props.batchNo,
				Date: date,
				demandedItems: [
					{
						RMCode: inputMaterialCode,
						material: inputMaterial,
						unit: unit,
						formulaQuantity: formulaQuantity,
						additionalQuantity: additionalQuantity,
					},
				],
			};
			setDrfCart(data);
		} else {
			let data = {
				RMCode: inputMaterialCode,
				material: inputMaterial,
				unit: unit,
				formulaQuantity: formulaQuantity,
				additionalQuantity: additionalQuantity,
			};
			drfCart.demandedItems.push(data);
		}
	};

	const handlePost = async () => {
		const res = (await postDRFView(drfCart)).data;
		if (res.product != "" && res.batchNo != "") {
			handleClose();
			setShowSuccess(true);
			setSuccess(true);
			setMessage('Dispensation Request');
		} else {
			handleClose();
			setShowSuccess(true);
			setSuccess(false);
			setMessage("Something went wrong.");
		}
	}

	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				fullWidth="true"
				startIcon={<PrintIcon />}
				onClick={handleClickOpen}
				disabled={props.product == undefined || props.product == ""}
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
										defaultValue={highestDrf}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={3}>
									<TextField
										id="drf-date"
										// label="Date:"
										fullWidth="true"
										variant="outlined"
										type="date"
										onChange={event => {
											setDate(event.target.value);
										}}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={3}>
									<TextField
										id="drf-product"
										label="Product:"
										fullWidth="true"
										value={props.product}
										variant="outlined"
										InputProps={{ readOnly: true }}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={3}>
									<TextField
										id="drf-batch-no"
										label="Batch No:"
										fullWidth="true"
										value={props.batchNo}
										variant="outlined"
										InputProps={{ readOnly: true }}
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
									<Autocomplete
										disablePortal
										id="required-code-no"
										value={selectedMaterialCode}
										inputValue={inputMaterialCode}
										options={materialCodes}
										getOptionLabel={option => option.RMCode}
										onChange={newValue => {
											setSelectedMaterialCode(newValue.target.value);
										}}
										onInputChange={(event, value) => {
											// setInputMaterialCode(value);
											getMaterialName(value);
										}}
										renderInput={params => (
											<TextField
												{...params}
												label="Code No:"
												variant="outlined"
											/>
										)}
									/>
								</GridItem>
							</GridContainer>

							<GridContainer>
								<GridItem xs={8} sm={8} md={8}>
									<Autocomplete
										disablePortal
										id="required-material"
										value={selectedMaterial}
										inputValue={inputMaterial}
										options={materialList}
										getOptionLabel={option => option.Material}
										// onChange={event => {
										// 	setSelectedMaterial(event.target.value);
										// }}
										onInputChange={(event, value) => {
											// setInputMaterial(value);
											getMaterialCodes(value);
										}}
										renderInput={params => (
											<TextField
												{...params}
												label="Material:"
												variant="outlined"
											/>
										)}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={3}>
									<TextField
										id="required-unit"
										InputProps={{ readOnly: true }}
										label="Unit:"
										fullWidth="true"
										variant="outlined"
										value={unit}
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
										onChange={event => {
											setFormulaQuantity(event.target.value);
										}}
									></TextField>
								</GridItem>

								<GridItem xs={12} sm={12} md={4}>
									<TextField
										id="required-additional-qty"
										label="Additional Qty:"
										fullWidth="true"
										variant="outlined"
										onChange={event => {
											setAdditionalQuantity(event.target.value);
										}}
									></TextField>
								</GridItem>
							</GridContainer>
						</CardContent>
					</Card>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" color="primary" onClick={handleAdd}>
						Add
					</Button>
					<Button variant="contained" color="primary" onClick={handlePost}>
						Post
					</Button>
					<Button variant="contained" color="primary" onClick={handleClose}>
						Cancel
					</Button>
				</DialogActions>
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Sr.</TableCell>
								<TableCell>Code</TableCell>
								<TableCell>Material</TableCell>
								<TableCell>Unit</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{drfCart.demandedItems != undefined &&
								drfCart.demandedItems.map((row, index) => {
									return (
										<TableRow key={row.ProductCode}>
											<TableCell component="th" scope="row">
												{index + 1}
											</TableCell>
											<TableCell>{row.RMCode}</TableCell>
											<TableCell>{row.material}</TableCell>
											<TableCell>{row.unit}</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
			</Dialog>
			{showSuccess == true && (<AlertModal
				showOpen={showSuccess}
				message={message}
				success={success}
			/>)}
		</div>
	);
}
