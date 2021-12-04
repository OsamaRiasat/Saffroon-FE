import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MenuItem from "@material-ui/core/MenuItem";

import PackSizeAdd from "../../Services/QA/Add_PackSize";

import {
	ProductCodeListForPackSize,
	ProductData,
	AddPackSize,
} from "../../Services/QA/Add_PackSize";

export default class AddPackSize extends Component {
  async componentDidMount() {
    this.getProductCodeList();
  }

  getProductCodeList = async () => {
    const productCodeList = (await ProductCodeListForPackSize()).data;
    console.log(productCodeList);
    this.setState({productCodeList: productCodeList});
  };

  getData = async (pcode) => {
    const sampledBtList = (await ProductData(pcode)).data;

    console.log(sampledBtList);
    this.setState({
      product: sampledBtList.Product,
      dosageForm: sampledBtList.DosageForm,
      registrationNumber: sampledBtList.RegistrationNo,
    });
    this.toggle(this.state.dosageForm);
  };

  state = {
    show: false,
  };

  toggle = (p) => {
    if (p == "Vial") {
      this.setState((currentState) => ({ show: true }));
    } else {
      this.setState((currentState) => ({ show: false }));
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      //API

      productCodeList: [],
      productCode: "",

      product: "",
      dosageForm: "",
      registrationNumber: "",
      packSize: "",
      packType: "",
      fillingWeight: "0",
      MRP: "",
    };
  }

  clearForm = () => {
    this.setState({
      productCode: "",
      product: "",
      dosageForm: "",
      registrationNumber: "",
      packSize: "",
      packType: "",
      fillingWeight: "0",
      MRP: "",
    });
  };

  postButton = async () => {
    try {
      const payload = {
        PackSize: this.state.packSize,
        PackType: this.state.packType,
        MRP: this.state.MRP,
        FillingWeight: this.state.fillingWeight,
        ProductCode: this.state.productCode,
      };

      console.log(payload);
      const data = await AddPackSize(payload);
      console.log(data);

      if (data.status === 201) {
        alert("Data Posted!!!");
        this.clearForm();
        this.getProductCodeList();
      } else {
        alert("Unexpected Error");
      }
    } catch {
      alert("Something Went Wrong!!!");
    }
  };

  render() {
    return (
      <div style={{ marginTop: 50 }}>
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 style={{ textAlign: "center" }}>Add Pack Size</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <Card style={{ marginLeft: 15, minWidth: 960 }}>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          select
                          variant="outlined"
                          label="Product Code:"
                          fullWidth="true"
                          value={this.state.productCode}
                          select
                          onChange={(event) => {
                            console.log(event.target.value);
                            this.setState({
                              productCode: event.target.value,
                            });
                            this.getData(event.target.value);
                          }}
                        >
                          {this.state.productCodeList.map((product) => (
                            <MenuItem
                              key={product.ProductCode}
                              value={product.ProductCode}
                            >
                              {product.ProductCode}
                            </MenuItem>
                          ))}
                        </TextField>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id=""
                          variant="outlined"
                          InputProps={{ readOnly: true }}
                          label="Product:"
                          fullWidth="true"
                          value={this.state.product}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Dosage Form:"
                          fullWidth="true"
                          InputProps={{ readOnly: true }}
                          value={this.state.dosageForm}
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Registration No:"
                          fullWidth="true"
                          value={this.state.registrationNumber}
                          InputProps={{ readOnly: true }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Pack Size:"
                          fullWidth="true"
                          value={this.state.packSize}
                          onChange={(event) => {
                            this.setState({
                              packSize: event.target.value,
                            });
                          }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Pack Type:"
                          fullWidth="true"
                          value={this.state.packType}
                          onChange={(event) => {
                            this.setState({
                              packType: event.target.value,
                            });
                          }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="MRP:"
                          fullWidth="true"
                          value={this.state.MRP}
                          onChange={(event) => {
                            this.setState({
                              MRP: event.target.value,
                            });
                          }}
                        />
                      </GridItem>

                      {this.state.show && (
                        <div id="hide">
                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              id=""
                              style={{ width: "100%" }}
                              label="Filling Weight"
                              multiline
                              variant="outlined"
                              value={this.state.fillingWeight}
                              onChange={(event) => {
                                this.setState({
                                  fillingWeight: event.target.value,
                                });
                              }}
                            />
                          </GridItem>
                        </div>
                      )}

                      <GridItem md={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth="true"
                          startIcon={<AddCircleOutlineIcon />}
                          onClick={this.postButton}
                        >
                          Add Pack Size
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
