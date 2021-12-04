import React, { Component } from 'react'
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import CardM from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from "@material-ui/data-grid";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MenuItem from "@material-ui/core/MenuItem";
import CardContent from "@material-ui/core/CardContent";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import BackupIcon from '@material-ui/icons/Backup';
import PrintIcon from '@material-ui/icons/Print';
import { Link } from 'react-router-dom';

import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter";
import CardBody from "../../components/Card/CardBody.js";
import PrintDrfModal from "../../components/Modal/PrintDrfModal.js";
import AlertModal from "../../components/Modal/AlertModal.js";

import {
	HighestCCNo,
	ProductCode,
	getQualityAssuranceList,
	BatchNo,
	Change_Control,
	getChangeControlNoList,
	getChangeControlNoData,
	saveVerificationChanges,
} from "../../Services/QA/Change_Control";


export default class ChangeControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//API
			dept: [
				"Capsule",
				"Dry Syrup",
				"Oral Liquid",
				"Tablet",
				"Quality Control",
				"Quality Assurance",
				"Production",
				"Raw Material St",
				"Packing Material",
				"Finished Goods",
				"Engineering",
			],
			nc: ["Temporary", "Potential"],
			kw: [
				"Caping",
				"Coating",
				"Color",
				"Cracking",
				"DRF",
				"Drying",
				"DT",
				"Formula",
				"Friability",
				"Granulation",
				"Hardness",
				"LOD",
				"Lubrication",
				"Mesh",
				"pH",
				"Reprocessing",
				"Shelf-Life",
				"Specification",
				"Sticking",
				"Sweetness",
				"Wastage",
				"WeightVar",
			],
			cat: [
				"Product Formulation",
				"Process",
				"Machinery",
				"Supplier",
				"Infrastructure",
				"Others",
			],
			statusOfChanges: ["Cancelled", "Pending", "Implemented"],
			degreeOfImplementation: [
				"Implemented as planned",
				"Implemented with amendments",
				"Changes cancelled",
			],
			des: ["Approved", "Rejected"],

			selected: {
				dept: "",
				nc: "",
				kw: "",
				cat: "",
				des: "",
			},

			ccn: "",
			ccnList: [],
			initiator: "",
			product: "",
			productList: [],
			batchNo: "",
			name: "",
			related: "",
			desc: "",
			purpose: "",
			commentsPM: "",
			commentsQC: "",
			commentsPD: "",
			commentsQA: "",
			date: "",
			printUrl: window.location.href.split("/")[5] === "print-change-control" ? true : false,
			qualityAssuranceList: [],
			vcStatusOfChanges: "",
			vcDate: "",
			vcImplementedChanges: "",
			vcDegreeOfImplementation: "",
			vcVerifiedBy: "",
			showVerificationSuccess: false,

		};
	}

	async componentDidMount() {
		var today = new Date();
		let date =
			today.getDate() +
			"-" +
			(today.getMonth() + 1) +
			"-" +
			today.getFullYear();
		this.setState({ date: date });
		if (!this.state.printUrl) {
			const hccn = (await HighestCCNo()).data;
			this.setState({ ccn: hccn.CCNo });
		}
		if (this.state.printUrl) {
			this.getchangeControlNoList();
			this.getQAsList();
		}
		const pl = (await ProductCode()).data;
		this.setState({ productList: pl });
	}

	async getQAsList() {
		const res = (await getQualityAssuranceList()).data;
		this.setState({ qualityAssuranceList: res });
	}

	async handleProd(pro) {
		const batch = (await BatchNo(pro)).data;
		this.setState({ batchNo: batch[0].batchNo });
	}

	async handlePost() {
		try {
			let temp = this.state.des === "Rejected" ? "REJECTED" : "APPROVED";
			var today = new Date();
			let date = today.getFullYear() + "-" + (today.getMonth() + 1 + "-" + today.getDate());
			const payload = {
				status: "CLOSE", // every time
				initiator: this.state.initiator,
				department: this.state.selected.dept,
				natureOfChange: this.state.selected.nc,
				keyword: this.state.selected.kw,
				category: this.state.selected.cat,
				QAStatus: "CLOSED",
				name: this.state.name,
				relatedChanges: this.state.related,
				descriptionOfChange: this.state.desc,
				intendedPurposeOfChange: this.state.purpose,
				commentsOfProductionManager: this.state.commentsPM,
				commentsOfQCManager: this.state.commentsQC,
				commentsOfPlantDirector: this.state.commentsPD,
				commentsOfQAManager: this.state.commentsQA,
				batchNo: this.state.batchNo,
				changeDate: date,
				// product: this.state.product
			};

			const resp = await ChangeControl(payload);

			if (resp.status === 201) {
				alert("Data Saved Successfully!");
			} else {
				alert("Exception thrown while sending request !!!");
			}
		} catch (error) {
			alert("Something Went Wrong");
		}
	}

	async getchangeControlNoList() {
		const res = (await getChangeControlNoList()).data;
		this.setState({ ccnList: res });
	}

	handlePrintChangeControl() {
		this.setState({ printUrl: true });
		this.getchangeControlNoList();
	}

	async getChangeControlDate(CCNo) {
		const res = (await getChangeControlNoData(CCNo)).data;
		this.setState({
			ccn: CCNo,
			date: res.date,
			initiator: res.initiator,
			selected: {
				dept: res.department,
				nc: res.natureOfChange,
				kw: res.keyword,
				cat: res.category,
			},
			product: res.product,
			batchNo: res.batchNo,
			name: res.name,
			related: res.relatedChanges,
			desc: res.descriptionOfChange,
			purpose: res.intendedPurposeOfChange,
			commentsPM: res.commentsOfProductionManager,
			commentsQC: res.commentsOfQCManager,
			commentsPD: res.commentsOfPlantDirector,
			commentsQA: res.commentsOfQAManager,
		});
	}

	async handleVerificationChanges() {
		try {
			let data = {
				state: this.state.vcStatusOfChanges,
				changeDate: this.state.vcDate,
				implementedChanges: this.state.vcImplementedChanges,
				degreeOfImplementation: this.state.vcDegreeOfImplementation,
				verifiedBy: this.state.vcVerifiedBy,
			};
			const res = await saveVerificationChanges(data, this.state.ccn);
			if(res.status === 200) {
				this.setState({ showVerificationSuccess: true });
			}
		} catch {
			alert('Something went wrong');
		}
	}

	render() {
		var today = new Date();
		let date =
			today.getDate() +
			"-" +
			(today.getMonth() + 1) +
			"-" +
			today.getFullYear();

		return (
			<div style={{ marginTop: "50px" }}>
				<GridContainer md={12}>
					<Card>
						<CardHeader color="primary">
							<h2 style={{ textAlign: "center" }}>
								{this.state.printUrl == true
									? "Print Change Control"
									: "Change Control"}
							</h2>
						</CardHeader>
						<CardBody style={{ marginLeft: 15, minWidth: 960 }}>
							<GridContainer>
								<Card>
									<CardContent>
										<GridContainer>
											<GridItem xs={12} sm={12} md={4}>
												<TextField
													id="date"
													fullWidth="true"
													InputProps={{ readOnly: true }}
													defaultValue={date}
													variant="outlined"
													label={"Date: "}
												/>
											</GridItem>

											<GridItem xs={12} sm={12} md={4}>
												{this.state.printUrl === true && (
													<TextField
														id=""
														variant="outlined"
														label="Change Control No(CCN):"
														fullWidth="true"
														select
														onChange={event => {
															this.getChangeControlDate(event.target.value);
														}}
													>
														{this.state.ccnList.map(data => (
															<MenuItem key={data} value={data}>
																{data}
															</MenuItem>
														))}
													</TextField>
												)}

												{this.state.printUrl === false && (
													<TextField
														id=""
														variant="outlined"
														label="Change Control No(CCN):"
														fullWidth="true"
														InputProps={{ readOnly: true }}
														value={this.state.ccn}
													/>
												)}
											</GridItem>

											<GridItem xs={12} sm={12} md={4}>
												<TextField
													id=""
													variant="outlined"
													label="Initiator:"
													fullWidth="true"
													value={this.state.initiator}
													onChange={event => {
														this.setState({
															initiator: event.target.value,
														});
													}}
												/>
											</GridItem>
										</GridContainer>

										<GridContainer>
											<GridItem xs={12} sm={12} md={4}>
												<TextField
													id=""
													select
													label="Department/Section"
													fullWidth="true"
													value={this.state.selected.dept}
													variant="outlined"
													SelectProps={{
														value: [this.state.selected.dept],
													}}
													onChange={event => {
														this.setState(prevState => ({
															selected: {
																// object that we want to update
																...prevState.selected, // keep all other key-value pairs
																dept: event.target.value, // update the value of specific key
															},
														}));
													}}
												>
													{this.state.dept.map(pri => (
														<MenuItem key={pri} value={pri}>
															{pri}
														</MenuItem>
													))}
												</TextField>
											</GridItem>
											<GridItem xs={12} sm={12} md={4}>
												<TextField
													id=""
													select
													label="Nature of NC:"
													fullWidth="true"
													value={this.state.selected.nc}
													variant="outlined"
													SelectProps={{
														value: [this.state.selected.nc],
													}}
													onChange={event => {
														this.setState(prevState => ({
															selected: {
																// object that we want to update
																...prevState.selected, // keep all other key-value pairs
																nc: event.target.value, // update the value of specific key
															},
														}));
													}}
												>
													{this.state.nc.map(pri => (
														<MenuItem key={pri} value={pri}>
															{pri}
														</MenuItem>
													))}
												</TextField>
											</GridItem>
											<GridItem xs={12} sm={12} md={4}>
												<TextField
													id=""
													select
													label="Keyword"
													fullWidth="true"
													value={this.state.selected.kw}
													variant="outlined"
													SelectProps={{
														value: [this.state.selected.kw],
													}}
													onChange={event => {
														this.setState(prevState => ({
															selected: {
																// object that we want to update
																...prevState.selected, // keep all other key-value pairs
																kw: event.target.value, // update the value of specific key
															},
														}));
													}}
												>
													{this.state.kw.map(pri => (
														<MenuItem key={pri} value={pri}>
															{pri}
														</MenuItem>
													))}
												</TextField>
											</GridItem>
										</GridContainer>
									</CardContent>
								</Card>

								<Card>
									<CardHeader color="danger">
										<h4>Change Required in</h4>
									</CardHeader>
									<CardContent>
										<GridContainer>
											<GridItem xs={12} sm={12} md={3}>
												<TextField
													id=""
													select
													label="Category:"
													fullWidth="true"
													value={this.state.selected.cat}
													variant="outlined"
													SelectProps={{
														value: [this.state.selected.cat],
													}}
													onChange={event => {
														this.setState(prevState => ({
															selected: {
																// object that we want to update
																...prevState.selected, // keep all other key-value pairs
																cat: event.target.value, // update the value of specific key
															},
														}));
													}}
												>
													{this.state.cat.map(pri => (
														<MenuItem key={pri} value={pri}>
															{pri}
														</MenuItem>
													))}
												</TextField>
											</GridItem>

											<GridItem xs={12} sm={12} md={3}>
												<TextField
													id=""
													select
													label="Product:"
													fullWidth="true"
													variant="outlined"
													select
													value={this.state.product}
													SelectProps={{
														value: [this.state.product],
													}}
													onChange={event => {
														this.setState({ product: event.target.value });
														this.handleProd(event.target.value);
													}}
												>
													{this.state.productList.map(pri => (
														<MenuItem key={pri} value={pri}>
															{pri}
														</MenuItem>
													))}
												</TextField>
											</GridItem>

											<GridItem xs={12} sm={12} md={3}>
												<TextField
													id=""
													variant="outlined"
													label="Batch No:"
													fullWidth="true"
													InputProps={{ readOnly: true }}
													value={this.state.batchNo}
													onChange={event => {
														this.setState({
															initiator: event.target.value,
														});
													}}
												/>
											</GridItem>

											<GridItem xs={12} sm={12} md={3}>
												<TextField
													id=""
													variant="outlined"
													label="Name:"
													fullWidth="true"
													value={this.state.name}
													onChange={event => {
														this.setState({ name: event.target.value });
													}}
												/>
											</GridItem>
										</GridContainer>
									</CardContent>
								</Card>
							</GridContainer>

							<Card>
								<CardContent>
									<GridContainer>
										<GridItem xs={12} sm={12} md={12}>
											<TextField
												id=""
												variant="outlined"
												label="Related Changes and Activities:"
												fullWidth="true"
												value={this.state.related}
												onChange={event => {
													this.setState({ related: event.target.value });
												}}
											/>
										</GridItem>
									</GridContainer>

									<GridContainer>
										<GridItem xs={12} sm={12} md={12}>
											<TextField
												id=""
												variant="outlined"
												label="Description of Change:"
												fullWidth="true"
												value={this.state.desc}
												onChange={event => {
													this.setState({ desc: event.target.value });
												}}
											/>
										</GridItem>
									</GridContainer>

									<GridContainer>
										<GridItem xs={12} sm={12} md={12}>
											<TextField
												id=""
												variant="outlined"
												label="Intended Purpose of Change:"
												fullWidth="true"
												value={this.state.purpose}
												onChange={event => {
													this.setState({ purpose: event.target.value });
												}}
											/>
										</GridItem>
									</GridContainer>

									<GridContainer>
										<GridItem xs={12} sm={12} md={12}>
											<TextField
												id=""
												variant="outlined"
												label="Comments of Production Manager (if required):"
												fullWidth="true"
												value={this.state.commentsPM}
												onChange={event => {
													this.setState({ commentsPM: event.target.value });
												}}
											/>
										</GridItem>
									</GridContainer>

									<GridContainer>
										<GridItem xs={12} sm={12} md={12}>
											<TextField
												id=""
												variant="outlined"
												label="Comments of QC Manager (if required):"
												fullWidth="true"
												value={this.state.commentsQC}
												onChange={event => {
													this.setState({ commentsQC: event.target.value });
												}}
											/>
										</GridItem>
									</GridContainer>

									<GridContainer>
										<GridItem xs={12} sm={12} md={12}>
											<TextField
												id=""
												variant="outlined"
												label="Comments of Plan Director:"
												fullWidth="true"
												value={this.state.commentsPD}
												onChange={event => {
													this.setState({ commentsPD: event.target.value });
												}}
											/>
										</GridItem>
									</GridContainer>

									<GridContainer>
										<GridItem xs={12} sm={12} md={3}>
											<TextField
												id=""
												select
												label="Decision:"
												fullWidth="true"
												value={this.state.selected.des}
												variant="outlined"
												onChange={event => {
													this.setState(prevState => ({
														selected: {
															// object that we want to update
															...prevState.selected, // keep all other key-value pairs
															des: event.target.value, // update the value of specific key
														},
													}));
												}}
											>
												{this.state.des.map(pri => (
													<MenuItem key={pri} value={pri}>
														{pri}
													</MenuItem>
												))}
											</TextField>
										</GridItem>
									</GridContainer>
									<GridContainer>
										<GridItem xs={12} sm={12} md={12}>
											<TextField
												id=""
												variant="outlined"
												label="Comments of QA Manager:"
												fullWidth="true"
												value={this.state.commentsQA}
												onChange={event => {
													this.setState({ commentsQA: event.target.value });
												}}
											/>
										</GridItem>
									</GridContainer>
								</CardContent>
							</Card>

							{this.state.printUrl === true && (
								<Card>
									<CardHeader color="primary">
										<h4>Verification of Changes</h4>
									</CardHeader>
									<CardContent>
										<GridContainer>
											<GridItem xs={12} sm={12} md={3}>
												<TextField
													id="status-of-changes"
													select
													label="Status of Changes:"
													fullWidth="true"
													variant="outlined"
													onChange={event => {
														this.setState({
															vcStatusOfChanges: event.target.value,
														});
													}}
												>
													{this.state.statusOfChanges.map(data => (
														<MenuItem key={data} value={data}>
															{data}
														</MenuItem>
													))}
												</TextField>
											</GridItem>

											<GridItem xs={12} sm={12} md={3}>
												<TextField
													id="verification-date"
													fullWidth="true"
													defaultValue={date}
													variant="outlined"
													// label={"Date: "}
													type="date"
													onChange={event => {
														this.setState({
															vcDate: event.target.value,
														});
													}}
												/>
											</GridItem>
										</GridContainer>

										<GridContainer>
											<GridItem xs={12} sm={12} md={12}>
												<TextField
													id="implemented-chagnes"
													variant="outlined"
													label="Implemented Changes:"
													fullWidth="true"
													onChange={event => {
														this.setState({
															vcImplementedChanges: event.target.value,
														});
													}}
												/>
											</GridItem>
										</GridContainer>

										<GridContainer>
											<GridItem xs={12} sm={12} md={3}>
												<TextField
													id="degree-of-implementation"
													select
													label="Degree of Implementation:"
													fullWidth="true"
													variant="outlined"
													onChange={event => {
														this.setState({
															vcDegreeOfImplementation: event.target.value,
														});
													}}
												>
													{this.state.degreeOfImplementation.map(data => (
														<MenuItem key={data} value={data}>
															{data}
														</MenuItem>
													))}
												</TextField>
											</GridItem>

											<GridItem xs={12} sm={12} md={3}>
												<TextField
													id="verified-by"
													select
													label="Verified By:"
													fullWidth="true"
													variant="outlined"
													onChange={event => {
														this.setState({
															vcVerifiedBy: event.target.value,
														});
													}}
												>
													{this.state.qualityAssuranceList.map(data => (
														<MenuItem key={data.id} value={data.id}>
															{data.username}
														</MenuItem>
													))}
												</TextField>
											</GridItem>
										</GridContainer>
										<GridContainer>
											<GridItem>
												<Button
													variant="contained"
													color="primary"
													fullWidth="true"
													onClick={event => {
														this.handleVerificationChanges();
													}}
												>
													Post
												</Button>
											</GridItem>
										</GridContainer>
									</CardContent>
								</Card>
							)}

							<GridContainer>
								{this.state.printUrl === true && (
									<GridItem xs={12} sm={12} md={3}>
										<PrintDrfModal product={this.state.product} batchNo={this.state.batchNo} />
									</GridItem>
								)}
								<GridItem xs={12} sm={12} md={3}>
									<Button
										variant="contained"
										color="primary"
										fullWidth="true"
										startIcon={<CloudUploadIcon />}
										onClick={event => {
											this.handlePost();
										}}
									>
										Post
									</Button>
								</GridItem>
								{this.state.printUrl === false && (
									<GridItem xs={12} sm={12} md={3}>
										<Button
											variant="contained"
											color="primary"
											fullWidth="true"
											startIcon={<PrintIcon />}
											component={Link}
											to="/saffron/QA/print-change-control"
											onClick={event => {
												this.handlePrintChangeControl();
											}}
										>
											Print Change Control
										</Button>
									</GridItem>
								)}
							</GridContainer>
						</CardBody>
					</Card>
				</GridContainer>
				{this.state.showVerificationSuccess == true && (
					<AlertModal
						showOpen={this.state.showVerificationSuccess}
						message="Verification of Changes"
						success={true}
					/>
				)}
			</div>
		);
	}
}
