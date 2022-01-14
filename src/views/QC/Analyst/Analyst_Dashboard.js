import React, { Component } from 'react';
import GridItem from "../../../components/Grid/GridItem";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import { makeStyles } from '@material-ui/core/styles';

import RM_COA_Approval from "../../../Services/QC/RM/RM_Pending_Prints.js";
import PM_COA_Approval from "../../../Services/QC/PM/PM_Pending_Prints";
import Product_COA_Approval from "../../../Services/QC/Product/Product_Pending_Prints.js";
import { Badge } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';

import { Link } from 'react-router-dom'


export default class AnalystDashboard extends Component{


    async componentDidMount() {
        const rm_qc = (await RM_COA_Approval.methods.RMAnalysisQCNo()).data;
        this.setState({ rm_count: rm_qc.length });
        console.log("RM COUNT :", this.state.rm_count)
    
        const pm_qc = (await PM_COA_Approval.methods.RMAnalysisQCNo()).data;
        this.setState({ pm_count: pm_qc.length });
        console.log("PM COUNT :", this.state.pm_count)
    
        const product_qc = (await Product_COA_Approval.methods.RMAnalysisQCNo()).data;
        this.setState({ product_count: product_qc.length });
        console.log("PRODUCT COUNT :", this.state.product_count)
      }
      constructor(props) {
        super(props);
        this.state = {
         
          rm_count: "",
          pm_count: "",
          product_count: "",
          
        };
      }
    
    render() { 
        return (
        
        <div style={{ marginTop: 50 }}>

            <GridContainer md={12}>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h2 style={{ textAlign: "center" }}>Analyst</h2>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem md={2}></GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <Card>
                                        <CardHeader color="info">
                                            <h4 style={{ textAlign: "center" }}>
                                            Pending Reports<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <Badge  badgeContent= {this.state.rm_count + this.state.pm_count+this.state.product_count} color="primary">
                          <MailIcon  style={{ fontSize: 20 }} color="info" />
                          </Badge>
                                            </h4>
                                        </CardHeader>
                                        <CardBody>
                                            <Button
                                            variant="contained"
                                            color="success"
                                            fullWidth="true"
                                            component={Link} to="/saffron/QC/Analyst/PM/PM_COA"
                                            >
                                            Raw Material<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <Badge badgeContent= {this.state.rm_count} color="info">
                          {/* <MailIcon color="info" /> */}
                          </Badge>
                                            </Button>
                                            <Button
                                            variant="contained"
                                            color="success"
                                            fullWidth="true"
                                            component={Link} to="/saffron/QC/Analyst/RM/RM_COA"
                                            >
                                            Pack Material<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <Badge badgeContent= {this.state.pm_count} color="primary">
                          {/* <MailIcon color="info" /> */}
                          </Badge>
                                            </Button>
                                            <Button
                                            variant="contained"
                                            color="success"
                                            fullWidth="true"
                                            component={Link} to="/saffron/QC/Analyst/Product/P_COA"
                                            >
                                            Products<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <Badge badgeContent= {this.state.product_count} color="primary">
                          {/* <MailIcon color="info" /> */}
                          </Badge>
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>
                                    <Card>
                                    <CardHeader color="info">
                                        <h4 style={{ textAlign: "center" }}>
                                        Data Entry
                                        </h4>
                                    </CardHeader>
                                    <CardBody>
                                        <Button
                                        variant="contained"
                                        color="success"
                                        fullWidth="true"
                                        component={Link} to="/saffron/QC/RM/data-entry" 

                                        >
                                        Raw Material
                                        </Button>
                                        <Button
                                        variant="contained"
                                        color="success"
                                        fullWidth="true"
                                        component={Link} to="/saffron/QC/PM/data-entry" 

                                        >
                                        Pack Material
                                        </Button>
                                        <Button
                                        variant="contained"
                                        color="success"
                                        fullWidth="true"
                                         component={Link} to="/saffron/QC/Product/data-entry" 

                                        >
                                        Products
                                        </Button>
                                    </CardBody>
                                    </Card>
                                </GridItem>

                            
                            </GridContainer>

                        
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Card>
                                    <CardHeader color="info">
                                        <h4 style={{ textAlign: "center" }}>Pending Sample</h4>
                                    </CardHeader>
                                    <CardBody>
                                    
                                        <center>
            
                                        <Button variant="contained" 
                                        color="success" 
                                        component={Link} to="/saffron/QC/RM/pending-reports" 
                                        
                                        >
                                            Raw Material
                                        </Button>
                                        <Button variant="contained" 
                                        color="success" 
                                        component={Link} to="/saffron/QC/PM/pending-reports" 
                                        
                                        >
                                            Packing Material
                                        </Button>
                                        <Button variant="contained" 
                                        color="success"
                                        
                                        component={Link} to="/saffron/QC/Product/pending-reports" 
                                        
                                        >
                                            Products
                                        </Button>
                                        </center> 
                                    </CardBody>

                                    </Card>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
           
        </div>);
    }
}
 
