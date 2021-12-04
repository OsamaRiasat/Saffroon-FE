import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MenuItem from "@material-ui/core/MenuItem";

import { ListOfDosageForms, AddProduct } from "../../Services/QA/Product_Add";

export default class addaproduct extends Component {
  async componentDidMount() {
    this.getDosageFormList();
    this.setRegandRenDate();
  }

  constructor(props) {
    super(props);
    this.state = {
      registrationDate: "",
      renewalDate: "",

      dosageFormList: [],
      dosageForm: "",

      productCode: "",
      registrationCode: "",
      product: "",
      genericName: "",
      composition: "",
      shelfLife: "",
    };
  }

  getDosageFormList = async () => {
    const dosageformlist = (await ListOfDosageForms()).data
      .List;

    console.log(dosageformlist);
    this.setState({
      dosageFormList: dosageformlist,
    });
  };

  setRegandRenDate = async () => {
    var today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    let rdate =
      today.getFullYear() +
      5 +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    this.setState({
      registrationDate: date,
      renewalDate: rdate,
    });
  };

  clearForm = () => {
    this.setState({
        registrationDate: "",
        renewalDate: "",
        dosageFormList: [],
        dosageForm: "",
        productCode: "",
        registrationCode: "",
        product: "",
        genericName: "",
        composition: "",
        shelfLife: "",
    });
  };

  postButton = async () => {
    this.setRegandRenDate();

    try {
      const payload = {
        ProductCode: this.state.productCode,
        Product: this.state.product,
        RegistrationNo: this.state.registrationCode,
        RegistrationDate: this.state.registrationDate,
        RenewalDate: this.state.renewalDate, 
        GenericName: this.state.genericName,
        Composition: this.state.composition,
        ShelfLife: this.state.shelfLife,
        dosageForm: this.state.dosageForm,
      };

      console.log(payload);
      const data = await AddProduct(payload);
      console.log(data);

      if (data.status === 201) {
        alert("Data Posted!!!");
        this.clearForm();
        this.getDosageFormList();
      } else {
        alert("Unexpected Error");
      }
    } catch {
      alert("Something Went Wrong!!!");
    }
  };

  render() {
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
              <h2 style={{ textAlign: "center" }}>Add a Product</h2>
            </CardHeader>
            <CardBody style={{ marginLeft: 15, minWidth: 960 }}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Product Code:"}
                    value={this.state.productCode}
                    onChange={(event) => {
                      this.setState({
                        productCode: event.target.value,
                      });
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Registration Code:"}
                    value={this.state.registrationCode}
                    onChange={(event) => {
                      this.setState({
                        registrationCode: event.target.value,
                      });
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Product:"}
                    value={this.state.product}

                    onChange={(event) => {
                      this.setState({
                        product: event.target.value,
                      });
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Dosage Form:"}
                    select
                    value={this.state.dosageForm}
                    select
                    onChange={(event) => {
                      console.log(event.target.value);
                      this.setState({
                        dosageForm: event.target.value,
                      });
                    }}
                  >
                    {this.state.dosageFormList.map((dose) => (
                      <MenuItem key={dose.dosageForm} value={dose.dosageForm}>
                        {dose.dosageForm}
                      </MenuItem>
                    ))}
                  </TextField>
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Generic Name:"}
                    value={this.state.genericName}

                    onChange={(event) => {
                      this.setState({
                        genericName: event.target.value,
                      });
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Composition:"}
                    value={this.state.composition}
                    
                    onChange={(event) => {
                      this.setState({
                        composition: event.target.value,
                      });
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Shelf-Life:"}
                    type="number"
                    value={this.state.shelfLife}

                    onChange={(event) => {
                      this.setState({
                        shelfLife: event.target.value,
                      });
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth="true"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={this.postButton}
                  >
                    Add a Product
                  </Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
