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
                <h2 style={{ textAlign: "center" }}>Quality Assurance</h2>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Batch</h4>
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
                          to="/saffron/QA/batch/issue"
                        >
                          Issue Batch Number
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/QA/batch-deviation"
                        >
                          Batch Deviation
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/QA/close-batch"
                        >
                          Close Batch
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/QA/batch-review"
                        >
                          Batch Review
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Add Items</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/QA/RM/add"
                        >
                          Add Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/QA/RM/packing-material/add"
                        >
                          Add Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/QA/product/add"
                        >
                          Add Products
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/QA/packSize/add"
                        >
                          Add Pack Size
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Views</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/QA/RM/view"
                        >
                          View Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to=""
                        >
                          View Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/QA/product/view"
                        >
                          View Products
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Sample</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/QA/RM/sample"
                        >
                          Sample Raw Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to=""
                        >
                          Sample Pack Material
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="saffron/QA/product/sample"
                        >
                          Sample Products
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Change Control</h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="saffron/QA/change-control"
                        >
                          Change Control
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/QA/print-change-control"
                        >
                          Print Change Control
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Supplier </h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/QA/addsupplier"
                        >
                          Add Supplier
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/QA/addMaterialToSupplier"
                        >
                          Add Material to Supplier
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>Formulation </h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/QA/formulation/add"
                        >
                          Raw Material Formulation
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <Card>
                      <CardHeader color="info">
                        <h4 style={{ textAlign: "center" }}>
                          Non-Conformance{" "}
                        </h4>
                      </CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth="true"
                          component={Link}
                          to="/saffron/QA/non-conformance"
                        >
                          Non-Conformance
                        </Button>
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
