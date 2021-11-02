import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import MenuItem from "@material-ui/core/MenuItem";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";
import { Checkbox } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { DataGrid } from "@material-ui/data-grid";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PrintIcon from "@material-ui/icons/Print";
import Autocomplete from "@material-ui/lab/Autocomplete";

import {
  BackToProductSelection,
  highestPlanNo,
  ProductCodes,
  ProductNames,
  ProductDetailsByCode,
  ProductDetailsByName,
  GoodsStockDetails,
  PostPlan,
} from "../../Services/Planning/A-Product_Selection.js";

class ProductsSelection extends React.Component {
	async componentDidMount() {
		const code_list = await ProductCodes();
		this.setState({ pcode_arr: code_list.data });
		const name_list = await ProductNames();
		this.setState({ pname_arr: name_list.data });
		const dm = (await highestPlanNo()).data.planNo__max;
		this.setState({ planno: dm + 1 });
		this.props.handle_plan(dm + 1);
		this.setState({
			planno: this.props.planno,
		});
		// this.props.handle_plan(this.state.planno);

		if (sessionStorage.getItem("isBack") === "true") {
			sessionStorage.setItem("isBack", false);
			const cart_data = (await BackToProductSelection(this.props.planno - 1))
				.data;

			// this.setState({
			//     cart:[...this.state.cart,...cart_data]
			// });
			for (let i = 0; i < cart_data.length; i++) {
				this.setState((prevState) => ({
					selected: {
						// object that we want to update
						...prevState.selected, // keep all other key-value pairs
						pname: cart_data[i]["Product"],
						packsize: cart_data[i]["PackSize"],
						batches: cart_data[i]["noOfBatchesToBePlanned"],
						inhand: cart_data[i]["inHandPacks"],
						planned: cart_data[i]["packsToBePlanned"],
						pcode: cart_data[i]["ProductCode"],
						packs: cart_data[i]["requiredPacks"],
					},
				}));
				this.updateCart();
				this.clearForm();
			}
		}
	}

	async saveForm() {
		if (this.state.cart.length !== 0) {
			const items = this.state.cart.map((item) => {
				return {
					ProductCode: item.pcode,
					PackSize: item.packsize,
					requiredPacks: item.packs,
					inHandPacks: item.inhand,
					packsToBePlanned: item.planned,
					noOfBatchesToBePlanned: item.batches,
				};
			});

			const payload = {
				planItems: items,
			};

			await PostPlan(payload);
		}
	}

	handleCodeAutofill = async (code) => {
		const data = await ProductDetailsByCode(code);

		this.setState({ packsize_arr: data.data.PackSizesList });
		this.setState({ units: data.data.units });
		this.setState({ standardBatch: data.data["batches"] });
		this.setState({ standardUnits: data.data["units"] });
		this.setState((prevState) => ({
			selected: {
				...prevState.selected,
				pcode: code,
				pname: data.data["Product"],
				batches: data.data["batches"],
				packsize: data.data.PackSizesList[0],
			},
		}));
		if (data.data.PackSizesList.length !== 0) {
      let packSizeArr = data.data.PackSizesList[0].split("x");
      let packSize = parseInt(packSizeArr[0]) * parseInt(packSizeArr[1]);
			packSize = (data.data.units / packSize).toFixed(0);
			this.setState((prevState) => ({
				selected: {
					...prevState.selected,
					packs: packSize,
				},
			}));
			this.setFGSWIP();
		}
	};

	handleNameAutofill = async (code) => {
		const data = await ProductDetailsByName(code);
		this.setState({ packsize_arr: data.data.PackSizesList });
		this.setState({ units: data.data.units });
		this.setState({ standardBatch: data.data["batches"] });
		this.setState({ standardUnits: data.data["units"] });
		this.setState((prevState) => ({
			selected: {
				// object that we want to update
				...prevState.selected, // keep all other key-value pairs
				pname: code,
				pcode: data.data["ProductCode"],
				batches: data.data["batches"],
				packsize: data.data.PackSizesList[0],
			},
		}));
	};

	async setFGSWIP() {
		let isF = this.state.isfgs === true ? "False" : "True";
		let isW = this.state.iswip === true ? "False" : "True";

		const data = await GoodsStockDetails(
			this.state.selected.pcode,
			this.state.selected.packsize,
			this.state.selected.packs,
			isF,
			isW
		);

		this.setState({ fgs_qty: data.data.FGS_Packs });
		this.setState({ wip_qty: data.data.WIP_Packs });
	}

	constructor(props) {
		super(props);
		this.state = {
			productNameValue: "",
			productCodeValue: "",
			cart: [],
			selected: {
				pname: "",
				packsize: "",
				batches: "",
				inhand: 0,
				planned: 0,
				pcode: "",
				packs: "",
			},
			// packs: "",
			units: "",
			planno: "",
			fgs_qty: "",
			wip_qty: "",
			isfgs: false,
			iswip: false,
			pname_arr: [],
			packsize_arr: [],
			pcode_arr: [],
			selectedRows: "",
			canChange: true,
			canDelete: true,
			canUpDown: true,
			canGoOnward: true,
			standardBatch: 1,
			standardUnits: 1,
		};
	}

	async setCart() {
		let isF = this.state.isfgs === true ? "False" : "True";
		let isW = this.state.iswip === true ? "False" : "True";

		const data = await GoodsStockDetails(
			this.state.selected.pcode,
			this.state.selected.packsize,
			this.state.selected.packs,
			isF,
			isW
		);
		this.setState((prevState) => ({
			selected: {
				// object that we want to update
				...prevState.selected, // keep all other key-value pairs
				inhand: data.data.Inhand_Packs,
				batches: data.data.batchesToBePlanned,
				planned: data.data.packsToBePlanned,
			},
		}));
		// this.state.selected.inhand = data.data.Inhand_Packs;
		// this.state.selected.batches = data.data.batchesToBePlanned;

		// this.state.selected.planned = data.data.packsToBePlanned;

		this.setState({
			fgs_qty: data.data.FGS_Packs,
			wip_qty: data.data.WIP_Packs,
		});
		// this.state.fgs_qty = data.data.FGS_Packs;
		// this.state.wip_qty = wip_qty;
	}

	async setCartAdd() {
		let isF = this.state.isfgs === true ? "False" : "True";
		let isW = this.state.iswip === true ? "False" : "True";

		const data = await GoodsStockDetails(
			this.state.selected.pcode,
			this.state.selected.packsize,
			this.state.selected.packs,
			isF,
			isW
		);
		this.setState((prevState) => ({
			selected: {
				// object that we want to update
				...prevState.selected, // keep all other key-value pairs
				inhand: data.data.Inhand_Packs,
				batches: data.data.batchesToBePlanned,
				planned: data.data.packsToBePlanned,
			},
		}));
		// this.state.selected.inhand = data.data.Inhand_Packs;
		// this.state.selected.batches = data.data.batchesToBePlanned;

		// this.state.selected.planned = data.data.packsToBePlanned;

		this.setState({
			fgs_qty: data.data.FGS_Packs,
			wip_qty: data.data.WIP_Packs,
		});
		// this.state.fgs_qty = data.data.FGS_Packs;
		// this.state.wip_qty = wip_qty;
		this.updateCart();
		this.clearForm();
	}

	async updateCart() {
		return new Promise((resolve) => {
			this.setState(
				{
					cart: [...this.state.cart, this.state.selected],
				},
				() => resolve()
			);
			this.setState({
				canGoOnward: false,
			});
		});
	}

	clearForm = () => {
		this.setState((prevState) => ({
			selected: {
				// object that we want to update
				...prevState.selected, // keep all other key-value pairs
				pname: "",
				packsize: "",
				batches: "",
				pcode: "",
			},
		}));

		this.setState((prevState) => ({
			selected: {
				// object that we want to update
				...prevState.selected, // keep all other key-value pairs
				packs: "",
			},
		}));

		this.setState({ units: "" });
		this.setState({ fgs_qty: "" });
		this.setState({ wip_qty: "" });
		this.setState({ isfgs: false });
		this.setState({ iswip: false });
	};

	render() {
		const products_array = [];
		for (let i = 0; i < this.state.cart.length; ++i) {
			let temp = {
				id: i + 1,
				pcode: this.state.cart[i].pcode,
				pname: this.state.cart[i].pname,
				packsize: this.state.cart[i].packsize,
				inhand: this.state.cart[i].inhand,
				planned: this.state.cart[i].planned,
				batches: this.state.cart[i].batches,
			};
			products_array.push(temp);
		}
		const columns = [
			{
				field: "pcode",
				headerName: "Code",
				width: 140,
				editable: false,
			},
			{
				field: "pname",
				headerName: "Name",
				width: 200,
				editable: false,
			},
			{
				field: "packsize",
				headerName: "Packsize",
				width: 140,
				editable: false,
			},
			{
				field: "inhand",
				headerName: "Inhand",
				type: "number",
				width: 120,
				editable: false,
			},
			{
				field: "planned",
				headerName: "Planned",
				type: "number",
				width: 140,
				editable: false,
			},
			{
				field: "batches",
				headerName: "Batches",
				type: "number",
				width: 130,
				editable: true,
			},
		];

		return (
			<div style={{ marginTop: 50 }}>
				<GridContainer md={12}>
					<GridItem xs={12} sm={12} md={12}>
						<Card>
							<CardHeader color="primary">
								<h2>A- Products Selection </h2>
							</CardHeader>
							<CardBody>
								<GridContainer>
									<CardM style={{ marginLeft: 15, minWidth: 960 }}>
										<CardContent>
											<GridContainer>
												<GridItem xs={12} sm={12} md={2}>
													<TextField
														id=""
														style={{ backgroundColor: "#ebebeb" }}
														InputProps={{ readOnly: true }}
														variant="outlined"
														label="Plan No:"
														value={this.state.planno}
													/>
												</GridItem>
												<GridItem xs={12} sm={12} md={3}>
													<FormControlLabel
														value={this.state.isfgs}
														checked={this.state.isfgs}
														control={<Checkbox color="primary" />}
														label="Don't include FGS Qty"
														labelPlacement="end"
														fullWidth="true"
														onChange={() => {
															this.setState({ isfgs: !this.state.isfgs });
														}}
													/>
												</GridItem>
												<GridItem xs={12} sm={12} md={2}>
													<TextField
														id="noOfContainers"
														variant="outlined"
														label=""
														InputProps={{ readOnly: true }}
														value={this.state.fgs_qty}
														onChange={(event) => {
															this.setState({ fgs_qty: event.target.value });
														}}
													/>
												</GridItem>
												<GridItem xs={12} sm={12} md={3}>
													<FormControlLabel
														value={this.state.iswip}
														checked={this.state.iswip}
														control={<Checkbox color="primary" />}
														label="Don't include WIP"
														labelPlacement="end"
														onChange={() => {
															this.setState({ iswip: !this.state.iswip });
														}}
													/>
												</GridItem>
												<GridItem xs={12} sm={12} md={2}>
													<TextField
														id="noOfContainers"
														variant="outlined"
														label=""
														InputProps={{ readOnly: true }}
														value={this.state.wip_qty}
														onChange={(event) => {
															this.setState({ wip_qty: event.target.value });
														}}
													/>
												</GridItem>
											</GridContainer>

											<GridContainer>
												<GridItem xs={12} sm={12} md={4}>
													<Autocomplete
														disablePortal
														id="product-code"
														value={this.productCodeValue}
														inputValue={this.state.selected.pcode}
														options={this.state.pcode_arr}
														getOptionLabel={(option) => option.ProductCode}
														onChange={(newValue) => {
															this.setState({
																productCodeValue: newValue.ProductCode,
															});
														}}
														onInputChange={(event, value) => {
															this.setState((prevState) => ({
																selected: {
																	...prevState.selected,
																	pcode: value,
																},
															}));
															this.handleCodeAutofill(value);
														}}
														renderInput={(params) => (
															<TextField
																{...params}
																label="Product Code:"
																variant="standard"
															/>
														)}
													/>
												</GridItem>

												<GridItem xs={12} sm={12} md={4}>
													<Autocomplete
														disablePortal
														id="product-name"
														value={this.productNameValue}
														inputValue={this.state.selected.pname}
														options={this.state.pname_arr}
														getOptionLabel={(option) => option.Product}
														onChange={(newValue) => {
															this.setState({
																productNameValue: newValue.ProductCode,
															});
														}}
														onInputChange={(event, value) => {
															console.log(event);
															this.setState((prevState) => ({
																selected: {
																	...prevState.selected,
																	pname: value,
																},
															}));
															this.handleNameAutofill(value);
														}}
														renderInput={(params) => (
															<TextField
																{...params}
																label="Product:"
																variant="standard"
															/>
														)}
													/>
												</GridItem>

												<GridItem xs={12} sm={12} md={4}>
													<Autocomplete
														disablePortal
														id="packsize"
														inputValue={this.state.selected.packsize}
														options={this.state.packsize_arr}
														getOptionLabel={(option) => option}
														onInputChange={(event, value) => {
															this.setState((prevState) => ({
																selected: {
																	// object that we want to update
																	...prevState.selected, // keep all other key-value pairs
																	packsize: event.target.value, // update the value of specific key
																},
															}));
															let packs_temp = parseInt(
																event.target.value.substring(
																	event.target.value.indexOf("x") + 1
																)
															);
															packs_temp = (
																this.state.units / packs_temp
															).toFixed(0);
															this.setState(
																(prevState) => ({
																	selected: {
																		// object that we want to update
																		...prevState.selected, // keep all other key-value pairs
																		packs: packs_temp,
																	},
																}),
																() => {
																	this.setCart();
																}
															);
														}}
														renderInput={(params) => (
															<TextField
																{...params}
																label="Pack Size:"
																variant="standard"
																value={this.state.selected.packsize}
															/>
														)}
													/>
												</GridItem>
											</GridContainer>

											<GridContainer>
												<GridItem xs={12} sm={12} md={4}>
													<TextField
														fullWidth="true"
														variant="outlined"
														label="Packs "
														value={this.state.selected.packs}
														onChange={(event) => {
                              let packSizeArr = this.state.selected.packsize.split("x");
                              let packSize = parseInt(packSizeArr[0]) * parseInt(packSizeArr[1]);
                              this.setState({
																units: event.target.value * packSize
															});
  														this.setState((prevState) => ({
                                selected: {
  																...prevState.selected,
                                  batches: (this.state.units / this.state.standardUnits).toFixed(0),
																	packs: event.target.value
																},
															}));
														}}
													/>
												</GridItem>

												<GridItem xs={12} sm={12} md={4}>
													<TextField
														fullWidth="true"
														variant="outlined"
														label="Batches"
														value={this.state.selected.batches}
														onChange={(event) => {
															this.setState((prevState) => ({
																selected: {
																	...prevState.selected,
																	batches: event.target.value,
																},
															}));
                              this.setState({units: event.target.value * this.state.standardUnits});
                              let packSizeArr = this.state.selected.packsize.split("x");
                              let packSize = parseInt(packSizeArr[0]) * parseInt(packSizeArr[1]);
															this.setState(
																(prevState) => ({
																	selected: {
																		...prevState.selected,
																		packs: ((event.target.value * this.state.standardUnits) / packSize).toFixed(0),
																	},
																})
																// () => {
																//   this.setCart();
																// }
															);
														}}
													/>
												</GridItem>

												<GridItem xs={12} sm={12} md={4}>
													<TextField
														fullWidth="true"
														variant="outlined"
														label="Units"
														value={this.state.units}
														onChange={(event) => {
															this.setState({ units: event.target.value });

                              let packSizeArr = this.state.selected.packsize.split("x");
                              let packSize = parseInt(packSizeArr[0]) * parseInt(packSizeArr[1]);
															this.setState((prevState) => ({
																selected: {
																	...prevState.selected,
                                  packs: (event.target.value / packSize).toFixed(0),
																	batches: Math.ceil(event.target.value / this.state.standardUnits),
																},
															}),
                              // () => {
															// 		this.setCart();
															// 	}
                              );
														}}
													/>
												</GridItem>
											</GridContainer>

											<GridContainer>
												<GridItem xs={12} sm={12} md={6}>
													<Button
														variant="contained"
														color="primary"
														size="small"
														startIcon={<ArrowUpwardIcon />}
														disabled={this.state.canUpDown}
														onClick={() => {
															var array = [...this.state.cart];
															for (
																let x = 0;
																x < this.state.selectedRows.length;
																++x
															) {
																var index = -1;
																for (
																	let i = 0;
																	i < products_array.length;
																	++i
																) {
																	if (
																		products_array[i].id ===
																		this.state.selectedRows[x]
																	) {
																		index = i;
																		break;
																	}
																}

																if (index > 0) {
																	let t = array[index];
																	array[index] = array[index - 1];
																	array[index - 1] = t;
																	this.setState({ cart: array });
																}
															}
														}}
													></Button>
													<Button
														variant="contained"
														color="primary"
														size="small"
														startIcon={<ArrowDownwardIcon />}
														disabled={this.state.canUpDown}
														onClick={() => {
															var array = [...this.state.cart];
															for (
																let x = 0;
																x < this.state.selectedRows.length;
																++x
															) {
																var index = -1;
																for (
																	let i = 0;
																	i < products_array.length;
																	++i
																) {
																	if (
																		products_array[i].id ===
																		this.state.selectedRows[x]
																	) {
																		index = i;
																		break;
																	}
																}

																if (
																	index !== -1 &&
																	index < products_array.length - 1
																) {
																	let t = array[index];
																	array[index] = array[index + 1];
																	array[index + 1] = t;
																	this.setState({ cart: array });
																}
															}
														}}
													></Button>
													<Button
														disabled={this.state.canGoOnward}
														onClick={() => {
															this.saveForm();
															this.props.form_handle(2);
														}}
														color="primary"
													>
														Go To Material Window
													</Button>
												</GridItem>

												<GridItem xs={12} sm={12} md={6}>
													<Button
														className=""
														startIcon={<AddCircleOutlineIcon />}
														onClick={() => {
															// pname: "",
															// packsize: "",
															// batches: "",
															// inhand: 0,
															// planned: 0,
															// pcode: "",
															// packs: "",
															if (
																this.state.selected.batches === "" ||
																this.state.selected.pcode === "" ||
																this.state.selected.packs === "" ||
																this.state.selected.packsize === "" ||
																this.state.selected.pname === "" ||
																this.state.fgs_qty === "" ||
																this.state.wip_qty === ""
															) {
																alert("Alert !! Kindly Provide All Data ");
															} else {
																let present = false;
																for (
																	let i = 0;
																	i < this.state.cart.length;
																	++i
																) {
																	if (
																		this.state.cart[i].pcode ===
																		this.state.selected.pcode
																	) {
																		present = true;
																		break;
																	}
																}
																if (
																	this.state.selected.pcode == "" ||
																	this.state.selected.pname == ""
																) {
																	alert(
																		"Please fill the form first to add product into cart."
																	);
																} else if (present === true) {
																	alert(
																		"This product is already present in cart."
																	);
																} else {
																	this.setCartAdd();
																}
															}
														}}
														color="primary"
													>
														Add
													</Button>
													<Button
														className=""
														startIcon={<EditIcon />}
														disabled={this.state.canChange}
														onClick={() => {
															var array = [...this.state.cart];
															for (
																let x = 0;
																x < this.state.selectedRows.length;
																++x
															) {
																var index = -1;
																for (
																	let i = 0;
																	i < products_array.length;
																	++i
																) {
																	if (
																		products_array[i].id ===
																		this.state.selectedRows[x]
																	) {
																		index = i;
																		break;
																	}
																}

																let temp = {
																	pcode: products_array[index].pcode,
																	pname: products_array[index].pname,
																	packsize: products_array[index].packsize,
																	inhand: products_array[index].inhand,
																	planned: products_array[index].planned,
																	batches: products_array[index].batches,
																};

																this.setState({ selected: temp });

																if (index !== -1) {
																	array.splice(index, 1);
																	this.setState({ cart: array });
																}
															}
														}}
														color="primary"
													>
														Change
													</Button>
													<Button
														className=""
														startIcon={<DeleteOutlineIcon />}
														disabled={this.state.canDelete}
														onClick={() => {
															var array = [...this.state.cart];
															for (
																let x = 0;
																x < this.state.selectedRows.length;
																++x
															) {
																var index = -1;
																for (
																	let i = 0;
																	i < products_array.length;
																	++i
																) {
																	if (
																		products_array[i].id ===
																		this.state.selectedRows[x]
																	) {
																		index = i;
																		break;
																	}
																}

																if (index !== -1) {
																	console.log(array);
																	array.splice(index, 1);

																	this.state.cart.splice(index, 1);
																	// this.setState({ cart: [...array] });
																}

																if (this.state.cart.length === 0) {
																	this.setState({
																		canGoOnward: true,
																	});
																}
															}
														}}
														color="secondary"
													>
														Delete
													</Button>
												</GridItem>
											</GridContainer>
										</CardContent>
									</CardM>
								</GridContainer>
							</CardBody>

							<GridItem xs={12} sm={12} md={12}>
								<Card>
									<CardBody>
										<GridContainer>
											<div style={{ height: 450, width: "100%" }}>
												<DataGrid
													rows={products_array}
													columns={columns}
													checkboxSelection
													onSelectionModelChange={(event) => {
														this.setState({ selectedRows: event });

														if (event.length === 1) {
															this.setState({ canChange: false });
															this.setState({ canDelete: false });
															this.setState({ canUpDown: false });
														} else {
															this.setState({ canChange: true });
															this.setState({ canDelete: true });
															this.setState({ canUpDown: true });
														}
													}}
													disableSelectionOnClick="false"
												/>
											</div>
										</GridContainer>
									</CardBody>
								</Card>
							</GridItem>

							<CardFooter className="center">
								<Button
									className="StyledButton"
									startIcon={<PrintIcon />}
									onClick={() => {}}
									color="primary"
								>
									Print Selected Plan
								</Button>
							</CardFooter>
						</Card>
					</GridItem>
				</GridContainer>
			</div>
		);
	}
}
export default ProductsSelection;
