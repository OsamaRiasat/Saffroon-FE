import React, { Component } from "react";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from "@material-ui/data-grid";
import PrintIcon from "@material-ui/icons/Print";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";
import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../../variables/genericVariables";
import {
  PlanNo_List_for_Planning,
  WhenPlanNoIsSelected
} from "../../../Services/Planning/Packing_Material_Planning.js";

class ProductsSelection extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

			PlanNoList:[],
			planno:"",
			canGoOnward: false,
			 cart: [],
			
			
		};
	}

	async componentDidMount() {
		const plan_list = await PlanNo_List_for_Planning();
		console.log("Plan List", plan_list.data)
		this.setState({ PlanNoList: plan_list.data });
	
	}
	async WhenPlanNoIsSelect(planno){
		const data = (await WhenPlanNoIsSelected(planno)).data
		
		this.setState({
			cart:data,
			canGoOnward: true,
		})
		console.log("CART: ",this.state.cart);
	}

	
	render() {
		const products_array = [];
		for (let i = 0; i < this.state.cart.length; ++i) {
			let temp = {
				id: i + 1,
				pcode: this.state.cart[i].ProductCode,
				pname: this.state.cart[i].Product,
				packsize: this.state.cart[i].PackSize,
				inhand: this.state.cart[i].inHandPacks,
				planned: this.state.cart[i].packsToBePlanned,
				batches: this.state.cart[i].noOfBatchesToBePlanned,
				oldBatch: this.state.cart[i].oldBatch,
				packs: this.state.cart[i].requiredPacks,
				// units: this.state.previousUnit
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
				{/* <ToastContainer
					position="top-center"
					autoClose={10000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					style={{ width: "auto" }}
				/> */}
				<GridContainer md={12}>
					<GridItem xs={12} sm={12} md={12}>
						<Card>
							<CardHeader color="primary">
								<h2>A- Products Selection</h2>
							</CardHeader>
							
							<GridItem xs={12} sm={12} md={12}>
								<Card>
									<CardBody>
										<GridContainer>
											
										<GridItem xs={12} sm={12} md={2}>
												<Select
														
                                                        name="planno"
														
                                                        placeholder="Plan No:"
                                                        className="customSelect"
                                                        classNamePrefix="select"
                                                        components={{
                                                            ValueContainer:CustomValueContainer,
                                                        }}
                                                        styles={CustomSelectStyle}
														
                                                        isSearchable={true}
                                                        options={this.state.PlanNoList}
                                                        value={
                                                            this.state.planno ? { planNo: this.state.planno } : null
                                                        }
                                                        getOptionValue={(option) => option.planNo}
                                                        getOptionLabel={(option) => option.planNo}
                                                        onChange={(value, select) => {
                                                            this.setState({ planno : value.planNo });
															this.props.handle_plan(value.planNo);
                                                            this.WhenPlanNoIsSelect(value.planNo);
                                                            // this.onChangeClearError(select.name);
                                                        }}
                                                    />
												</GridItem>
												<GridItem xs={12} sm={12} md={6}>
												
													<Button
														disabled={!this.state.canGoOnward}
														onClick={() => {
															localStorage.setItem('backToPorductSelection', false);
															// this.saveForm();
															this.props.form_handle(2);
														}}
														color="primary"
													>
														Go To Material Window
													</Button>
												</GridItem>
	
										</GridContainer>
										<GridContainer>
											<div style={{ height: 450, width: "100%" }}>
												<DataGrid
													rows={products_array}
													columns={columns}
													
													
													disableSelectionOnClick="true"
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
