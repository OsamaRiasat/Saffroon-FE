import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const useStyles = {
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  btn: {
    color: "black",
  },
};

const classes = makeStyles(useStyles);

export default class Dashboard extends Component {
  render() {
    return (
      <div style={{ marginTop: 50 }}>
        <GridContainer md={12}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h2 style={{ textAlign: "center" }}>Store & Planning</h2>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Planning</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          classes={{
                            root: classes.root, // class name, e.g. `classes-nesting-root-x`
                          }}
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/planning"
                        >
                          Raw Material 
                        </Button>
                        <Button
                          classes={{
                            root: classes.root, // class name, e.g. `classes-nesting-root-x`
                          }}
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/planning"
                        >
                          Pcking Material 
                        </Button>
                        
                      </CardBody>
                    </Card>
                  </GridItem>
                  

                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Demand Form</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/RM/Demand"
                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/PM/Demand"
                        >
                          Packing Material
                        </Button>
                        
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Purchase Order</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/purchase-order"
                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/PM/IGP"
                        >
                          Packing Material
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>

                </GridContainer>

                <GridContainer>
                  {/* <GridItem xs={12} sm={12} md={2}></GridItem> */}
                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>IGP Note</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/RM/IGP"
                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/PM/IGP"
                        >
                          Packing Material
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Generate GRN</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/RM/GRN"
                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/PM/GRN"
                        >
                          Packing Material
                        </Button>
                        
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Post GRN</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/RM/PostGRN"
                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/PM/PostGRN"
                        >
                          Packing Material
                        </Button>
                        
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={2}></GridItem>
                </GridContainer>
                
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info">
                      <h4 style={{ textAlign: "center" }}>Dispensing</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                        color="success"
                        fullWidth="true"
                        component={Link}
                        to="/saffron/RM/Dispensing"
                        >Raw Material</Button>
                      </CardBody>
                    </Card>

                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Material Return Note</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/RM/RawMaterialReturnNote" 

                        >
                          Raw Material 
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/PM/PackingMaterialReturnNote" 

                        >
                          Pack Material
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="danger">
                        <h4 style={{ textAlign: "center" }}>Material Destruction Note</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/RM/RawMaterialDestructionNote" 

                        >
                          Raw Material 
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link} to="/saffron/PM/PackingMaterialDestructionNote" 

                        >
                          Pack Material
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>


                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info">
                      <h4 style={{ textAlign: "center" }}>PRINT GRN</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                        color="success"
                        fullWidth="true"
                        component={Link}
                        to="/saffron/RM/GRN-Print"
                        >Raw Material</Button>
                          <Button
                        color="success"
                        fullWidth="true"
                        component={Link}
                        to="/saffron/PM/GRN-Print"
                        >Packing Material</Button>
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
