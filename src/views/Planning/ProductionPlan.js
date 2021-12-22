import React, { Component } from 'react'
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PrintIcon from '@material-ui/icons/Print';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ProductionCalculation, saveProductionPlan, deleteProductionPlan } from "../../Services/Planning/C-Production_Calculation";
export default class ProductionPlan extends Component {
    
    async componentDidMount() {
        // const data = (await ProductionCalculation(this.props.planno));
        
        // const temp_list = data.data.list.map((item) => {
        //     return(
        //         {
        //             "rankofplan": item["Rank of Plan"],
        //             "name": item.Product,
        //             "packsize": item.PacSize,
        //             "reqB": item.BatchesToBePlanned,
        //             "workB": item.WorkableBatches,
        //             "reqP": item.packsRequired,
        //             "workP": item.workablePacks,
        //         }
        //     )
        // })

        // this.setState({cart: temp_list});
    }

    state = {
        firstline: true,
        secondline: true,
        cart: [
            {
                rankofplan: "First Line",
                name: "p1",
                packsize: "1x1",
                reqB: 1,
                workB: 1,
                reqP: 1111,
                workP: 1,
            },
            {
                rankofplan: "Second Line",
                name: "p2",
                packsize: "2x2",
                reqB: 2,
                workB: 2,
                reqP: 2222,
                workP: 2,
            },
            {
                rankofplan: "First Line",
                name: "p3",
                packsize: "3x3",
                reqB: 3,
                workB: 3,
                reqP: 3333,
                workP: 3,
            },
            {
                rankofplan: "Second Line",
                name: "p4",
                packsize: "4x4",
                reqB: 4,
                workB: 4,
                reqP: 4444,
                workP: 4,
            },
        ]
    };

    handleSavePlan = async () => {
        const data = (await saveProductionPlan(parseInt(this.props.planno)));
        if(data.status == 200) {
            toast.success('Plan saved successfully.');
            localStorage.removeItem('planNumber');
            localStorage.removeItem('backToPorductSelection');
            this.props.form_handle(1);
        }
    }

    handleDeletePlan = async () => {
        const data = (await deleteProductionPlan(parseInt(this.props.planno)));
        if(data.status == 204) {
            toast.success('Plan deleted successfully.');
            localStorage.removeItem('planNumber');
            localStorage.removeItem('backToPorductSelection');
            this.props.form_handle(1);
        }
    }

    handlePlanBatches=async ()=>{
        const data = (await ProductionCalculation(this.props.planno));
        
        const temp_list = data.data.list.map((item) => {
            return(
                {
                    "rankofplan": item["Rank of Plan"],
                    "name": item.Product,
                    "packsize": item.PacSize,
                    "reqB": item.BatchesToBePlanned,
                    "workB": item.WorkableBatches,
                    "reqP": item.packsRequired,
                    "workP": item.workablePacks,
                }
            )
        })

        this.setState({cart: temp_list});
    }

    render() {

        const products_array = []
        let id_count = 1;
        for (let i = 0; i < this.state.cart.length; ++i) {
            let temp = {
                id: id_count,
                rankofplan: this.state.cart[i].rankofplan,
                name: this.state.cart[i].name,
                packsize: this.state.cart[i].packsize,
                reqB: this.state.cart[i].reqB,
                reqP: this.state.cart[i].reqP,
                workB: this.state.cart[i].workB,
                workP: this.state.cart[i].workP,
            };
            if(this.state.firstline === true && temp.rankofplan === "First Line") {
                id_count++;
                products_array.push(temp);
            }
            else if (this.state.secondline === true && temp.rankofplan === "Second Line") {
                id_count++;
                products_array.push(temp);
            }
        }
        const columns = [
            {
                field: 'rankofplan',
                headerName: 'Rank of Plan',
                width: 160,
                editable: true,
            },
            {
                field: 'name',
                headerName: 'Product',
                width: 210,
                editable: true,
            },
            {
                field: 'packsize',
                headerName: 'PackSize',
                width: 140,
                editable: true,
            },
            {
                field: 'reqB',
                headerName: 'Req Batches',
                type: 'number',
                width: 160,
                editable: true,
            },
            {
                field: 'workB',
                headerName: 'Workable Batches',
                type: 'number',
                width: 200,
                editable: true,
            },
            {
                field: 'reqP',
                headerName: 'Req Packs',
                type: 'number',
                width: 150,
                editable: true,
            },
            {
                field: 'workP',
                headerName: 'Workable Packs',
                type: 'number',
                width: 180,
                editable: true,
            },
        ];

        return (
            <div style={{marginTop:50}}>
                <ToastContainer
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
				/>
                <GridContainer md={12}>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h2 >C- Production Plan </h2>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <CardM style={{ marginLeft: 15, minWidth: 960 }}>
                                    <CardContent>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <FormControlLabel
                                                    value={this.state.firstline}
                                                    checked={this.state.firstline}
                                                    onChange={(event) => {
                                                        this.setState({ firstline: !this.state.firstline })
                                                    }}
                                                    control={<Checkbox color="primary" />}
                                                    label="First Line"
                                                    labelPlacement="end"
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormControlLabel
                                                    value={this.state.secondline}
                                                    checked={this.state.secondline}
                                                    onChange={(event) => {
                                                        this.setState({ secondline: !this.state.secondline })
                                                    }}
                                                    
                                                    control={<Checkbox color="primary" />}
                                                    label="Second Line Plan"
                                                    labelPlacement="end"
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={7}>
                                                <Button className="" onClick={() => {
                                                    this.handlePlanBatches() }} 
                                                    color="primary">Plan Batches</Button>

                                                <Button className="" startIcon={<ArrowBackIosIcon />} onClick={() => {
                                                    this.props.form_handle(2);
                                                }} color="primary">Back To Materials Selection</Button>
                                            </GridItem>

                                        </GridContainer>

                                        <GridContainer md={12} class="mt-0">
                                            <GridItem xs={12} sm={12} md={12}>
                                                <Card>
                                                    <CardBody>
                                                        <GridContainer>
                                                            <div style={{ height: 450, width: '100%' }}>
                                                                <DataGrid
                                                                    rows={products_array}
                                                                    columns={columns}
                                                                />
                                                            </div>
                                                        </GridContainer>
                                                    </CardBody>
                                                </Card>
                                            </GridItem>
                                        </GridContainer>


                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <FormControlLabel
                                                    value=""
                                                    control={<Checkbox color="primary" />}
                                                    label="Pledge Available Stock"
                                                    labelPlacement="end"
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={1}>

                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={7}>
                                                <Button className="" startIcon={<PrintIcon />} onClick={() => {
                                                    //add code to print
                                                }} color="primary">Print Plan</Button>
                                                <Button className="" startIcon={<SaveIcon />} onClick={() => {
                                                    this.handleSavePlan();
                                                    //call the api function to send back all the data of CART
                                                }} color="primary">Save Plan</Button>
                                                <Button className="" startIcon={<DeleteIcon />} onClick={() => {
                                                    this.handleDeletePlan();
                                                    //call the api function to send a plannumber back to database to delete plan
                                                }} color="secondary">Delete Plan</Button>
                                            </GridItem>

                                        </GridContainer>
                                    </CardContent>
                                </CardM>
                            </GridContainer>
                        </CardBody>

                    </Card>
                </GridItem>
                </GridContainer>
            </div>
        )
    }
}
