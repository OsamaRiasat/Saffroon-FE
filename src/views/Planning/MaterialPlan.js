import React, { Component } from 'react'
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
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

import { PlanMaterialCalculation } from "../../Services/Planning/B-Material_calculation.js";

export default class MaterialPlan extends Component {

    async componentDidMount() {
        // const data = (await PlanMaterialCalculation(this.props.planno, this.state.includeQuarantine, this.state.includePIP));
        
        // const temp_list = data.data.list.map((item) => {
        //     return(
        //         {
        //             "rmcode": item.RMCode,
        //             "name": item.Material,
        //             "inhand": item.Inhand,
        //             "reqqty": item.ReqQty,
        //             "unit": item.Units,
        //             "demandqty": item.demandedQuantity,
        //         }
        //     )
        // })

        // this.setState({cart: temp_list});
        sessionStorage.setItem("isBack",true)
    }

    constructor(props) {
        super(props);
        this.state = {
            cart: [
                
            ],
            rmcode: "",
            name: "",
            unit: "",
            reqqty: "",
            inhand: "",
            demandqty: "",
            includeQuarantine: false,
            includePIP: false,
            quarantine: "",
            PIP: "",
        }
    }

    handleCalculateMaterials=async ()=>{
        const data = (await PlanMaterialCalculation(this.props.planno, this.state.includeQuarantine, this.state.includePIP));
        
        const temp_list = data.data.list.map((item) => {
            return(
                {
                    "rmcode": item.RMCode,
                    "name": item.Material,
                    "inhand": item.Inhand,
                    "reqqty": item.ReqQty,
                    "unit": item.Units,
                    "demandqty": item.demandedQuantity,
                }
            )
        })

        this.setState({cart: temp_list});
    }
    render() {
        const products_array = []
        for (let i = 0; i < this.state.cart.length; ++i) {
            let temp = {
                id: i + 1,
                rmcode: this.state.cart[i].rmcode,
                name: this.state.cart[i].name,
                reqqty: this.state.cart[i].reqqty,
                unit: this.state.cart[i].unit,
                inhand: this.state.cart[i].inhand,
                demandqty: this.state.cart[i].demandqty,
            };
            products_array.push(temp);
        }
        const columns = [
            {
                field: 'rmcode',
                headerName: 'RMCode',
                width: 170,
                editable: true,
            },
            {
                field: 'name',
                headerName: 'Name',
                width: 210,
                editable: true,
            },
            {
                field: 'unit',
                headerName: 'Unit',
                width: 110,
                editable: true,
            },
            {
                field: 'reqqty',
                headerName: 'ReqQty',
                type: 'number',
                width: 140,
                editable: true,
            },
            {
                field: 'inhand',
                headerName: 'Inhand',
                type: 'number',
                width: 130,
                editable: true,
            },
            {
                field: 'demandqty',
                headerName: 'DemandQty',
                type: 'number',
                width: 160,
                editable: true,
            },
        ];
        return (
            <div style={{marginTop:50}}>
                
                <GridContainer md={12}>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h2 >B- Material Plan </h2>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <CardM style={{ marginLeft: 15, minWidth: 960 }}>
                                    <CardContent>

                                        <GridContainer>

                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField
                                                    value={this.state.rmcode}
                                                    id=""
                                                    select
                                                    label="RM Code:"
                                                    fullWidth="true"
                                                    onChange={(event) => {
                                                        this.setState({ rmcode: event.target.value });
                                                        for (let i = 0; i < this.state.cart.length; ++i) {
                                                            if (this.state.cart[i]["rmcode"] == event.target.value) {
                                                                this.setState({ name: this.state.cart[i]["name"] });
                                                                this.setState({ inhand: this.state.cart[i]["inhand"] });
                                                                this.setState({ unit: this.state.cart[i]["unit"] });
                                                                this.setState({ demandqty: this.state.cart[i]["demandqty"] });
                                                                this.setState({ reqqty: this.state.cart[i]["reqqty"] });
                                                                break;
                                                            }
                                                        }
                                                    }}
                                                >
                                                    {this.state.cart.map((product) => (
                                                        <MenuItem key={product["rmcode"]} value={product["rmcode"]}>
                                                            {product["rmcode"]}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <TextField
                                                    value={this.state.name}
                                                    id=""
                                                    select
                                                    label="Material:"
                                                    fullWidth="true"
                                                    onChange={(event) => {
                                                        this.setState({ name: event.target.value });
                                                        for (let i = 0; i < this.state.cart.length; ++i) {
                                                            if (this.state.cart[i]["name"] == event.target.value) {
                                                                this.setState({ rmcode: this.state.cart[i]["rmcode"] });
                                                                this.setState({ inhand: this.state.cart[i]["inhand"] });
                                                                this.setState({ unit: this.state.cart[i]["unit"] });
                                                                this.setState({ demandqty: this.state.cart[i]["demandqty"] });
                                                                this.setState({ reqqty: this.state.cart[i]["reqqty"] });
                                                                break;
                                                            }
                                                        }
                                                    }}
                                                >
                                                    {this.state.cart.map((product) => (
                                                        <MenuItem key={product["name"]} value={product["name"]}>
                                                            {product["name"]}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField id="" variant="outlined" label="Unit " value={this.state.unit}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField id="" variant="outlined" label="Required" value={this.state.reqqty}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <TextField id="" variant="outlined" label="Inhand" value={this.state.inhand}
                                                />
                                            </GridItem>

                                        </GridContainer>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={5}>
                                                <FormControlLabel
                                                    value=""
                                                    control={<Checkbox color="primary" />}
                                                    label="Don't include Quarantine Quantity"
                                                    labelPlacement="end"
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField id="" variant="outlined" label="" InputProps={{ readOnly: true, }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <FormControlLabel
                                                    value=""
                                                    control={<Checkbox color="primary" />}
                                                    label="Don't include PIP"
                                                    labelPlacement="end"
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField id="" variant="outlined" label="" InputProps={{ readOnly: true, }}
                                                />
                                            </GridItem>
                                        </GridContainer>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <Button className="" onClick={() => {
                                                    this.handleCalculateMaterials()
                                                }} color="primary">Calculate Materials</Button>
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={2}>

                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={7}>
                                                <Button className="" startIcon={<ArrowBackIosIcon />} onClick={() => {
                                                    this.props.form_handle(1);
                                                    localStorage.setItem('backToPorductSelection', true);
                                                }} color="primary">Back To Products Selection</Button>
                                                <Button className="" endIcon={<ArrowForwardIosIcon />} onClick={() => {
                                                    this.props.form_handle(3);
                                                }} color="primary">GoTo Production Plan</Button>
                                            </GridItem>

                                        </GridContainer>
                                    </CardContent>
                                </CardM>
                            </GridContainer>
                        </CardBody>

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

                        <CardFooter className="center">
                            <Button className="StyledButton" startIcon={<PrintIcon />} onClick={() => {
                            }} color="primary">Print Material Plan</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
                </GridContainer>
            </div>
        )
    }
}
