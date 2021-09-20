import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import { makeStyles } from '@material-ui/core/styles';


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
                  <GridItem xs={12} sm={12} md={3}>
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
                          // color="success"
                          fullWidth="true"
                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          
                        >
                          Products
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
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
                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Products
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
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
                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Products
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Results Loading</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Products
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>COA Approval</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Products
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Data Analysis</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Products
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Copy of COA</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Products
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
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
                        >
                          Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                        >
                          Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
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
                        <h4 style={{ textAlign: "center" }}>Analyst</h4>
                      </CardHeader>
                      <CardBody>
                        <center>
                          <Button variant="contained" color="success">
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
