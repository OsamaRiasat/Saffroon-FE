import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import { makeStyles } from '@material-ui/core/styles';
import RM_COA_Approval from "../../Services/QC/RM/RM_Pending_Prints.js";
import PM_COA_Approval from "../../Services/QC/PM/PM_Pending_Prints";
import Product_COA_Approval from "../../Services/QC/Product/Product_Pending_Prints.js";
import { Badge } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';

import { Link } from 'react-router-dom'




const useStyles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  btn: {
    color:'black'
  },

};

const classes = makeStyles(useStyles);


export default class Dashboard extends Component {

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
                <h2 style={{ textAlign: "center" }}>Quality Control</h2>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>
                          View Specifications
                        </h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          classes={{
                            root: classes.root, // class name, e.g. `classes-nesting-root-x`
                          }}
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/RM/view-specs"
                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/PM/view-specs"
                        >
                          Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/Product/view-specs" 
                        >
                          Products
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>
                          New Specifications
                        </h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/RM/new-specs" 

                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/PM/new-specs" 

                        >
                          Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/Product/new-specs" 

                        >
                          Products
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>
                          Edit Specifications
                        </h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/RM/edit-specs" 

                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/PM/edit-specs" 

                        >
                          Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/Product/edit-specs" 

                        >
                          Products
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>

                  {/* <GridItem xs={12} sm={12} md={3}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Results Loading</h4>
                      </CardHeader>
                      <CardBody>
                      <Button
                          variant="contained"
                          // color="success"
                          fullWidth="true"
                          // component={Link} to="" 

                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          // color="success"
                          fullWidth="true"
                          // component={Link} to="" 

                        >
                          Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          // color="success"
                          fullWidth="true"
                          // component={Link} to="" 

                        >
                          Products
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem> */}
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>COA Approval</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/RM/COA" 

                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/PM/COA" 

                        >
                          Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/product/COA" 

                        >
                          Products
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Data Analysis</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/RM/data-analysis" 

                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/PM/data-analysis" 

                        >
                          Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/Product/data-analysis" 

                        >
                          Products
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>

                  {/* <GridItem xs={12} sm={12} md={3}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Copy of COA</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          // color="success"
                          fullWidth="true"
                          // component={Link} to="" 

                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          // color="success"
                          fullWidth="true"
                          // component={Link} to="" 

                        >
                          Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          // color="success"
                          fullWidth="true"
                          // component={Link} to="" 

                        >
                          Products
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem> */}

                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>
                          Sample Assignment
                        </h4>
                      </CardHeader>
                      <CardBody>

                      <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/RM/sample-assignment" 

                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/PM/sample-assignment" 

                        >
                          Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/product/sample-assignment" 

                        >
                          Products
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>


             {/* Pending Reports */}

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Print Pending Reports<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <Badge  badgeContent= {this.state.rm_count + this.state.pm_count+this.state.product_count} color="primary">
                          <MailIcon  style={{ fontSize: 20 }} color="info" />
                          </Badge>   </h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/RM/P_COA" 

                        >
                          Raw Material <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <Badge badgeContent= {this.state.rm_count} color="primary">
                          {/* <MailIcon color="info" /> */}
                          </Badge>
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/PM/P_COA" 

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
                          component={Link} to="/saffron/QC/product/P_COA" 

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
                        <h4 style={{ textAlign: "center" }}>LABELS PRINTING</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/Labels/RM" 

                        >
                          Raw Material 
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/Labels/PM" 

                        >
                          Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/QC/Labels/P" 

                        > PRODUCT
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>

                </GridContainer>


                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Analyst</h4>
                      </CardHeader>
                      <CardBody>
                        <center>
                          <Button variant="contained" 
                          color="success" 
                          component={Link} to="/saffron/QC/blockanalyst" 
                          
                          >
                            Manage Analyst
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
      </div>
    );
  }
}

// export default function Dashboard() {

//   return (

//       );
// }
