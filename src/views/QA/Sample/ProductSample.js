import React, { Component } from "react";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";

export default class ProductSample extends Component {
  render() {
    var today = new Date();
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();

    return (
      <div
        style={{
          padding: "5px",
          marginTop: "10px",
          paddingLeft: "20px",
        }}
      >
        <GridContainer md={12}>
          <Card>
            <CardHeader
              color="primary"
              style={{
                padding: "5px",
                marginTop: "10px",
                paddingLeft: "20px",
              }}
            >
              <h2>
                <center>Product Sample</center>{" "}
              </h2>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <Card style={{ marginLeft: 15, minWidth: 960 }}>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id="date"
                          fullWidth="true"
                          InputProps={{ readOnly: true }}
                          variant="outlined"
                          label="Date"
                          value={date}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Product Code:"
                          select
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Product:"
                          select
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <span style={{ fontSize: "20px" }}>Blistering</span>
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Batch No:"
                          select
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Batch Size:"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Mfg Date:"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Exp Date:"
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Sample Status:"
                          select
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Sample Quantity:"
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label=""
                          select
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="QC No:"
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={9}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Sampled by:"
                          select
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <Button className="" color="primary" fullWidth="true">
                          Receive Sample
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </CardContent>
                </Card>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
