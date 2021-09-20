import React, { Component } from 'react'
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Card from "../../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import { DataGrid } from "@material-ui/data-grid";

import Pendings from "../../../Services/QC/Product/Product_Analyst_Pending_Samples.js"

export default class RMPendingReports extends Component {
    async componentDidMount()
    {
        const data= (await Pendings.methods.CurrentAnalystSample() ).data;
        console.log(data);
        this.setState({
            pendings:data
        })
    }
    constructor(props)
    {
        super(props)
        this.state={
            pendings:[]
        }
    }
    render() {
        const products_array = [];
        for (let i = 0; i < this.state.pendings.length; ++i) {
            let temp = {
              id: this.state.pendings[i].QCNo,
              qc: this.state.pendings[i].QCNo,
              materialname: this.state.pendings[i].Product,
              assignedDate: this.state.pendings[i].assignedDateTime,
              stage: this.state.pendings[i].stage,
              
            };
            products_array.push(temp);
          }
        const columns = [
            {
                field: "qc",
                headerName: "QC#",
                width: 110,

            },
            {
                field: "materialname",
                headerName: "Material Name",
                width: 300,

            },
            {
                field: "assignedDate",
                headerName: "Assigned Date",
                width: 300,

            },
            {
                field: "stage",
                headerName: "Stage",
                width: 300,

            },
        ];
        return (
            <div style={{ marginTop: 50 }}>
                <GridContainer md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 style={{textAlign:"center"}}> Product Pending Reports </h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <CardM style={{ marginLeft: 15, minWidth: 960 }}>
                                    <CardContent>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <GridContainer>
                                                <div style={{ height: 450, width: "100%" }}>
                                                    <DataGrid
                                                        rows={products_array}
                                                        columns={columns}
                                                       
                                                        disableSelectionOnClick
                                                    />
                                                </div>
                                            </GridContainer>
                                        </GridItem>
                                    </CardContent>
                                </CardM>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridContainer>
            </div>
        )
    }
}
