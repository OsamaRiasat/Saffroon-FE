import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter";
import CardBody from "../../components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from "@material-ui/data-grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import BackupIcon from "@material-ui/icons/Backup";
import PrintIcon from "@material-ui/icons/Print";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";


import { addPackingMaterial, Packing_Material_Auto_Code_Generator } from '../../Services/QA/RawMaterial_Add';

export default class AddPackingMaterial extends Component {
	constructor(props) {
		super(props);
		this.state = {
			unit: ["g", "mg", "kg", "no"],
			category: ["Primary", "Secondary", "Tertiary", "Accessory"],

			packingMaterialCode: "",
			material: "",

			selected: {
				unit: "",
				category: "",
			},
		};
	}
	onChangeCategory  = async (e) =>{

		const rc = (await Packing_Material_Auto_Code_Generator(e)).data;
		this.setState({ packingMaterialCode: rc });
	  };
	clearForm = () => {
		this.setState({
			packingMaterialCode: "",
			material: "",
		});
		this.setState(prevState => ({
			selected: {
				...prevState.selected,
				unit: "",
				category: "",
			},
		}));
	};

	postButton = async () => {
		try {
			const payload = {
				PMCode: this.state.packingMaterialCode,
				Material: this.state.material,
				Units: this.state.selected.unit,
				Type: this.state.selected.category,
			};

			console.log(payload);
			const data = await addPackingMaterial(payload);
			console.log(data);

			if (data.status === 201) {
				alert("Data Posted!!!");
				this.clearForm();
			} else {
				alert("Unexpected Error");
			}
		} catch {
			alert("Something Went Wrong!!!");
		}
	};

	render() {
		return (
			<div
				style={{
					padding: "5px",
					marginTop: "10px",
					paddingLeft: "20px",
				}}
			>
				<GridContainer md={12}>
					<Card>
						<CardHeader
							color="primary"
							style={{
								padding: "5px",
								marginTop: "10px",
								paddingLeft: "20px",
							}}
						>
							<h2 style={{ textAlign: "center" }}>Add Packing Material</h2>
						</CardHeader>
						<CardBody style={{ marginLeft: 15, minWidth: 960 }}>
							<GridContainer>
							<GridItem xs={12} sm={12} md={3}>
									<TextField
										id=""
										fullWidth="true"
										variant="outlined"
										label={"Category:"}
										select
										value={this.state.selected.category}
										onChange={event => {
											this.onChangeCategory(event.target.value);
											this.setState(prevState => ({
												selected: {
													// object that we want to update
													...prevState.selected, // keep all other key-value pairs
													category: event.target.value, // update the value of specific key
												},
											}));
										}}
									>
										{this.state.category.map(pri => (
											<MenuItem key={pri} value={pri}>
												{pri}
											</MenuItem>
										))}
									</TextField>
								</GridItem>
								
								<GridItem xs={12} sm={12} md={3}>
									<TextField
										id=""
										fullWidth="true"
										variant="outlined"
										label={"Material:"}
										value={this.state.material}
										onChange={event => {
											this.setState({
												material: event.target.value,
											});
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={3}>
									<TextField
										id=""
										fullWidth="true"
										variant="outlined"
										label={"Unit:"}
										select
										value={this.state.selected.unit}
										onChange={event => {
											this.setState(prevState => ({
												selected: {
													// object that we want to update
													...prevState.selected, // keep all other key-value pairs
													unit: event.target.value, // update the value of specific key
												},
											}));
										}}
									>
										{this.state.unit.map(pri => (
											<MenuItem key={pri} value={pri}>
												{pri}
											</MenuItem>
										))}
									</TextField>
								</GridItem>
							
								<GridItem xs={12} sm={12} md={3}>
									<TextField
										id=""
										fullWidth="true"
										inputProps={{readOnly: true}}
										style={{ backgroundColor: "#ebebeb" }}
										variant="outlined"
										label={"Packing Material Code:"}
										value={this.state.packingMaterialCode}
										onChange={event => {
											this.setState({
												packingMaterialCode: event.target.value,
											});
										}}
									/>
								</GridItem>
								
							</GridContainer>
							<GridContainer>
								<GridItem xs={12} sm={12} md={3}>
									<Button
										variant="contained"
										color="primary"
										fullWidth="true"
										startIcon={<AddCircleOutlineIcon />}
										onClick={this.postButton}
									>
										Add a Packing Material
									</Button>
								</GridItem>
							</GridContainer>
						</CardBody>
					</Card>
				</GridContainer>
			</div>
		);
	}
}
