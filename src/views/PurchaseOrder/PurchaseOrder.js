import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";

import purchaseOrderService from "../../Services/PurchaseOrder/purchase_Order";


class PurchaseOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			highestPurchaseOrderNumber: "",
			demandNumberList: [],
			selectedDemandNumber: "",
			suppliersData: [],
			selectedSupplierName: "",
			selectedSupplierId: "",
      materialCodes: [],
      selectedRawMaterialCode: "",
      selectedMaterial: [],
      quantity: "",
      rateUnitPkr: "",
      totalValue: "",
      deliveryDate: "",
      purchaseOrderCart: []
		};
	}

	componentDidMount() {
		this.getHighestPurchaseOrderNumber();
		this.getDemandNumberList();
		this.getSupliersData();
	}

	async getHighestPurchaseOrderNumber() {
		const res = (await purchaseOrderService.methods.highestPurchaseOrderNo())
			.data;
		this.setState({ highestPurchaseOrderNo: res.PONo__max });
	}

	async getDemandNumberList() {
		const res = (await purchaseOrderService.methods.demandNumberList()).data;
		this.setState({ demandNumberList: res });
	}

	async getSupliersData() {
		const res = (await purchaseOrderService.methods.suppliersData()).data;
		this.setState({ suppliersData: res });
	}

	async getApprovedMaterialList(data) {
		console.log(data);
		const res = (await purchaseOrderService.methods.supplierApprovedMaterial(data)).data;
	}

	async getMaterialCodes(DNO, SID) {
    let data = {
      DNo: DNO,
      SID: SID
    }
		const res = (await purchaseOrderService.methods.materialCodes(data)).data;
		this.setState({ materialCodes: res });
	}

  async getMaterial(DNO, SID) {
    let data = {
      DNo: DNO,
      SID: SID
    }
		const res = (await purchaseOrderService.methods.material(data)).data;
		// this.setState({ materialCodes: res });
    console.log(res);
	}

  async getMaterialByCode(code) {
    const res = (await purchaseOrderService.methods.materialByCode(code)).data;
    this.setState({ selectedMaterial: res[0] });
  }

  handleAdd() {
    if (this.state.purchaseOrderCart.PO_ITEMS == undefined || this.state.purchaseOrderCart.length == 0) {
      let data = {
				DNo: this.state.selectedDemandNumber,
				PO_ITEMS: [
					{
						SID: this.state.selectedSupplierId,
						RMCode: this.state.selectedRawMaterialCode,
						Quantity: this.state.quantity,
						Material: this.state.selectedMaterial.Material,
            Unit: this.state.selectedMaterial.Units,
            RateUnitPkr: this.state.rateUnitPkr,
            TotalValue: this.state.totalValue,
            DeliveryDate: this.state.deliveryDate
					},
				],
			};
      this.setState({ purchaseOrderCart: data });
    } else {
      let data = {
        SID: this.state.selectedSupplierId,
        RMCode: this.state.selectedRawMaterialCode,
        Quantity: this.state.quantity,
        Material: this.state.selectedMaterial.Material,
        Unit: this.state.selectedMaterial.Units,
        RateUnitPkr: this.state.rateUnitPkr,
        TotalValue: this.state.totalValue,
        DeliveryDate: this.state.deliveryDate
      };
      this.state.purchaseOrderCart.PO_ITEMS.push(data);
    }
  }

  handlePost = async () => {
    const res = (await purchaseOrderService.methods.postPurchaseOrder(this.state.purchaseOrderCart)).data;
    console.log(res);
    if(res.DNo != undefined && res.DNo != '') {
      this.setState({
				highestPurchaseOrderNumber: "",
				selectedDemandNumber: "",
				selectedSupplierName: "",
				selectedSupplierId: "",
				selectedRawMaterialCode: "",
				quantity: "",
				rateUnitPkr: "",
				totalValue: "",
				deliveryDate: "",
				purchaseOrderCart: [],
			});
      this.getHighestPurchaseOrderNumber();
    }
  }

	render() {
		return (
			<div style={{ marginTop: 50 }}>
				<GridContainer md={12}>
					<Card>
						<CardHeader color="primary">
							<h2 style={{ textAlign: "center" }}> Puchase Order </h2>
						</CardHeader>
						<CardBody style={{ marginLeft: 15, minWidth: 960 }}>
							<GridContainer>
								<Card>
									<CardContent>
										<GridContainer>
											<GridItem xs={12} sm={12} md={4}>
												<TextField
													id="po-number"
													variant="outlined"
													label="P.O No."
													fullWidth="true"
													InputProps={{ readOnly: true }}
													value={this.state.highestPurchaseOrderNo}
												/>
											</GridItem>
											<GridItem xs={12} sm={12} md={4}>
												<TextField
													id="demand-number"
													variant="outlined"
													label="Demand No."
													fullWidth="true"
													select
													onChange={event => {
														this.setState({ selectedDemandNumber: event.target.value });
                            console.log(this.state.selectedSupplierId);
														console.log(this.state.selectedDemandNumber);
                            if(event.target.value != "" && this.state.selectedSupplierId != "") {
                              this.getMaterialCodes(event.target.value, this.state.selectedSupplierId);
                              // this.getMaterial(event.target.value, this.state.selectedSupplierId);
                            }
													}}
												>
													{this.state.demandNumberList.map(data => (
														<MenuItem key={data.DNo} value={data.DNo}>
															{data.DNo}
														</MenuItem>
													))}
												</TextField>
											</GridItem>
										</GridContainer>
									</CardContent>
								</Card>
								<CardM style={{ marginLeft: 15, minWidth: 750 }}>
									<CardHeader color="primary">
										<h4>Supplier's Details</h4>
									</CardHeader>
									<CardContent>
										<GridContainer>
											<GridItem xs={12} sm={12} md={4}>
												<TextField
													id="supplier-id"
													variant="outlined"
													label="Supplier ID"
													fullWidth="true"
													select
													SelectProps={{
														value: [this.state.selectedSupplierId],
													}}
													onChange={event => {
														let selectedName = this.state.suppliersData.filter(e => e.S_ID == event.target.value)[0].S_Name;
														this.setState({
															selectedSupplierName: selectedName,
                              selectedSupplierId: event.target.value
														});
														// this.getApprovedMaterialList(event.target.value);
                            if(this.state.selectedDemandNumber != "" && event.target.value != "") {
                              this.getMaterialCodes(this.state.selectedDemandNumber, event.target.value);
                              // this.getMaterial(this.state.selectedDemandNumber, event.target.value);
                            }
													}}
												>
													{this.state.suppliersData.map(data => (
														<MenuItem key={data.S_ID} value={data.S_ID}>
															{data.S_ID}
														</MenuItem>
													))}
												</TextField>
											</GridItem>
											<GridItem xs={12} sm={12} md={4}>
												<TextField
													id="supplier-name"
													variant="outlined"
													label="Supplier Name"
													fullWidth="true"
													select
													SelectProps={{
														value: [this.state.selectedSupplierName],
													}}
													onChange={event => {
														let selectedId = this.state.suppliersData.filter(e => e.S_Name == event.target.value)[0].S_ID;
														this.setState({
                              selectedSupplierId: selectedId,
                              selectedSupplierName: event.target.value
                            });
                            console.log(this.state.selectedDemandNumber);
                            console.log(selectedId);
                            if(this.state.selectedDemandNumber != "" && selectedId != "") {
                              this.getMaterialCodes(this.state.selectedDemandNumber, selectedId);
                              // this.getMaterial(this.state.selectedDemandNumber, selectedId);
                            }
														// this.getApprovedMaterialList(event.target.value);
													}}
												>
													{this.state.suppliersData.map(data => (
														<MenuItem key={data.S_Name} value={data.S_Name}>
															{data.S_Name}
														</MenuItem>
													))}
												</TextField>
											</GridItem>
										</GridContainer>
										<GridContainer>
											<GridItem xs={12} sm={12} md={12}>
												<TextField
													id="address"
													variant="outlined"
													label="Address"
													fullWidth="true"
													// value={this.state.ccn}
												/>
											</GridItem>
										</GridContainer>
									</CardContent>
								</CardM>
								<CardM style={{ marginLeft: 15, minWidth: 750 }}>
									<CardHeader color="primary">
										<h4>Material Details</h4>
									</CardHeader>
									<CardContent>
										<GridContainer>
											<GridItem xs={12} sm={12} md={4}>
												<TextField
													id="material-code"
													variant="outlined"
													label="Material Code"
													fullWidth="true"
                          select
													onChange={(event) => {
                            console.log(event.target.value);
                            this.setState({ selectedRawMaterialCode: event.target.value });
                            this.getMaterialByCode(event.target.value);
                          }}
												>
                          {this.state.materialCodes.map(data => (
														<MenuItem key={data.RMCode} value={data.RMCode}>
															{data.RMCode}
														</MenuItem>
													))}
                        </TextField>
											</GridItem>
											<GridItem xs={12} sm={12} md={4}>
												<TextField
													id="material-name"
													variant="outlined"
													label="Material Name"
													fullWidth="true"
													value={this.state.selectedMaterial.Material}
												/>
											</GridItem>
										</GridContainer>
										<GridContainer>
											<GridItem xs={12} sm={12} md={5}>
												<TextField
													id="quanity"
													variant="outlined"
													label="Quantity"
													fullWidth="true"
                          onChange={(event) => {
                            this.setState({ quantity: event.target.value });
                          }}
													// value={this.state.ccn}
												/>
											</GridItem>
											<GridItem xs={12} sm={12} md={5}>
												<TextField
													id="rate-unit"
													variant="outlined"
													label="Rate/Unit(PKR)"
													fullWidth="true"
                          onChange={(event) => {
                            this.setState({ rateUnitPkr: event.target.value });
                          }}
												/>
											</GridItem>
										</GridContainer>
										<GridContainer>
											<GridItem xs={12} sm={12} md={5}>
												<TextField
													id="total-value"
													variant="outlined"
													label="Total Value"
													fullWidth="true"
                          onChange={(event) => {
                            this.setState({ totalValue: event.target.value });
                          }}
												/>
											</GridItem>
											<GridItem xs={12} sm={12} md={5}>
												<TextField
													id="delivery-date"
													variant="outlined"
													// label="Delivery Date"
													fullWidth="true"
                          type="date"
                          onChange={(event) => {
                            this.setState({ deliveryDate: event.target.value });
                          }}
												/>
											</GridItem>
										</GridContainer>
									</CardContent>
								</CardM>
							</GridContainer>
							<GridContainer>
								<GridItem>
									<Button variant="contained" color="primary" fullWidth="true" onClick={event => {this.handleAdd()}}>
										Add
									</Button>
								</GridItem>
								<GridItem>
									<Button variant="contained" color="primary" fullWidth="true" onClick={event => {this.handlePost()}}>
										Save
									</Button>
								</GridItem>
							</GridContainer>
						</CardBody>
					</Card>
				</GridContainer>
				<GridContainer md={12}>
					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Material Code</TableCell>
									<TableCell>Material</TableCell>
									<TableCell>Unit</TableCell>
									<TableCell>Quantity</TableCell>
									<TableCell>Rate/Unit</TableCell>
									<TableCell>Total Value</TableCell>
									<TableCell>Delivery Date</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.state.purchaseOrderCart.PO_ITEMS != undefined &&
									this.state.purchaseOrderCart.PO_ITEMS.map((row, index) => {
										return (
											<TableRow key={row.RMCode}>
												<TableCell component="th" scope="row">
													{row.RMCode}
												</TableCell>
												<TableCell>{row.Material}</TableCell>
												<TableCell>{row.Unit}</TableCell>
												<TableCell>{row.Quantity}</TableCell>
												<TableCell>{row.RateUnitPkr}</TableCell>
												<TableCell>{row.TotalValue}</TableCell>
												<TableCell>{row.DeliveryDate}</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</TableContainer>
				</GridContainer>
			</div>
		);
	}
}
export default PurchaseOrder;