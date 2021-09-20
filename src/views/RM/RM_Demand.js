import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

//import API Calls from Services

import {
  getRMDemandHighestDNo,
  RawMaterialNames,
  RawMaterialCodes,
  RawMaterialSearchByRMCode,
  RawMaterialSearchByName,
  RMDemands,
} from "../../Services/Inventory/inventory.js";

import "../../styles/products.css";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  root: {
    minWidth: 1575,
    marginLeft: 25,
  },
};

function insertAt(array, index, data) {
  if (index !== 0) {
    index = index - 1;
  }
  console.log("Add in Cart ", array, index, data);
  array.splice(index, 0, data);
}

const useStyles = makeStyles(styles);

class PackingMaterialDemand extends React.Component {
  async componentDidMount() {
    const dm = (await getRMDemandHighestDNo()).data["DNo__max"];
    console.log(dm);
    this.setState((prevState) => ({
      selected: {
        // object that we want to update
        ...prevState.selected, // keep all other key-value pairs
        demandnumber: dm + 1, // update the value of specific key
      },
    }));
    const pName = (await RawMaterialNames()).data; //[{Material:'matname'}]

    console.log(pName);
    this.setState({
      productsName: pName,
    });

    const RMcode = (await RawMaterialCodes()).data; //[{Material:'matname'}]

    console.log(RMcode);
    this.setState({
      productsRMCode: RMcode,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      //products that will be called by API
      // replace "name" and "pmcode"
      productsName: [],
      productsRMCode: [],

      //to be called by API

      // demandnumber:(await getRMDemandHighestDNo()).data['DNo__max'],
      // demandnumber: demandnumber.data,

      //API
      priority: ["Normal", "Urgent", "Most Urgent"],

      // DO NOT TOUCH CART
      cart: [],
      // DO NOT TOUCH SELECTED ROWS
      selectedRows: [],
      // DO NOT TOUCH SELECTED
      selected: {
        id: 0,
        date: "",
        demandnumber: "",
        plannumber: "",
        demandquantity: "",
        category: "",
        priority: "Normal",
        pmcode: "",
        name: "",
        stockinhand: 0,
        unit: "",
      },

      // NOT TO TOUCH
      canChange: true,
      canDelete: true,
      first: true,
    };
  }

  async updateCart() {
    insertAt(this.state.cart, this.state.selected.id, this.state.selected);
    // return new Promise(resolve => {
    //   this.setState({
    //     cart: [...this.state.cart, this.state.selected]
    //   }, ()=>resolve());
    // })
  }

  handleSetCatRmcode = async (mat) => {
    const data = (await RawMaterialSearchByName(mat)).data;
    this.setState((prevState) => ({
      selected: {
        // object that we want to update
        ...prevState.selected, // keep all other key-value pairs
        category: data["Type"],
        pmcode: data["RMCode"],
        unit: data["Units"],
      },
    }));
  };
  clearForm = () => {
    this.setState((prevState) => ({
      selected: {
        // object that we want to update
        ...prevState.selected, // keep all other key-value pairs

        plannumber: "",
        demandquantity: "",
        category: "",
        priority: "Normal",
        pmcode: "",
        name: "",
        stockinhand: 0,
        unit: "",
      },
    }));
  };
  handleSetCatMatName = async (code) => {
    const data = (await RawMaterialSearchByRMCode(code)).data[0];
    console.log("RM COde", data);
    this.setState((prevState) => ({
      selected: {
        // object that we want to update
        ...prevState.selected, // keep all other key-value pairs
        category: data["Type"],
        name: data["Material"],
        unit: data["Units"],
      },
    }));
  };

  handlePostData = async () => {
    if (this.state.cart.length === 0) {
      alert("Demanded Items are Empty !!!");
    } else {
      try {
        var dataSend = this.state.cart.map((item) => {
          return {
            RMCode: item.pmcode,
            Priority: item.priority,
            DemandedQty: item.demandquantity,
          };
        });

        const payload = {
          demandedItems: dataSend,
        };
        console.log("Payload", payload);
        console.log("cart", this.state.cart);
        const resp = (await RMDemands(payload)).status;
        if (resp === 201) {
          alert("RM Demand Raised");
          this.setState({
            cart: [],
          });
          const dm = (await getRMDemandHighestDNo()).data["DNo__max"];
          console.log(dm);
          this.setState((prevState) => ({
            selected: {
              // object that we want to update
              ...prevState.selected, // keep all other key-value pairs
              demandnumber: dm + 1, // update the value of specific key
            },
          }));
        } else {
          alert("Exception Thrown !!!!");
        }
      } catch (error) {
        console.log("Some thing Went Wrong ");
      }
    }
  };

  render() {
    const products_array = [];
    for (let i = 0; i < this.state.cart.length; ++i) {
      let temp = {
        id: this.state.cart[i].id,
        PlanN: this.state.cart[i].plannumber,
        Category: this.state.cart[i].category,
        RMCode: this.state.cart[i].pmcode,
        Material: this.state.cart[i].name,
        Qty: this.state.cart[i].demandquantity,
        Unit: this.state.cart[i].unit,
        Inhand: this.state.cart[i].stockinhand,
        Priority: this.state.cart[i].priority,
      };
      products_array.push(temp);
    }
    const columns = [
      // {
      //   field: 'id',
      //   type: 'number',
      //   headerName: 'ID',
      //   width: 100
      // },
      // {
      //   field: 'PlanN',
      //   type: 'number',
      //   headerName: 'PlanN',
      //   width: 120
      // },
      {
        field: "Category",
        headerName: "Category",
        width: 140,
      },
      {
        field: "RMCode",
        headerName: "RMCode",
        width: 140,
      },
      {
        field: "Material",
        headerName: "Material",
        width: 175,
      },
      {
        field: "Qty",
        headerName: "Qty",

        width: 100,
      },
      {
        field: "Unit",
        headerName: "Unit",
        width: 110,
      },
      {
        field: "Inhand",
        headerName: "Inhand",

        width: 120,
      },
      {
        field: "Priority",
        headerName: "Priority",

        width: 130,
      },
    ];

    var today = new Date();
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    return (
      <div style={{ marginTop: 50 }}>
        <GridContainer md={12}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h2>Raw Material Demand Form</h2>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      id="date"
                      style={{ backgroundColor: "#ebebeb" }}
                      fullWidth="true"
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      defaultValue={"Date: " + date}
                      onChange={(event) => {
                        this.setState((prevState) => ({
                          selected: {
                            // object that we want to update
                            ...prevState.selected, // keep all other key-value pairs
                            date: event.target.value, // update the value of specific key
                          },
                        }));
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={7} style={{ marginLeft: 5 }}>
                    <TextField
                      id="priority"
                      select
                      label="Priority"
                      fullWidth="true"
                      value={this.state.selected.priority}
                      //onChange={}
                      // helperText="_____________________________"
                      variant="outlined"
                      onChange={(event) => {
                        this.setState((prevState) => ({
                          selected: {
                            // object that we want to update
                            ...prevState.selected, // keep all other key-value pairs
                            priority: event.target.value, // update the value of specific key
                          },
                        }));
                      }}
                    >
                      {this.state.priority.map((pri) => (
                        <MenuItem key={pri} value={pri}>
                          {pri}
                        </MenuItem>
                      ))}
                    </TextField>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <CardM style={{ marginLeft: 15 , width:"30%" }}>
                    <CardContent>
                      <GridItem xs={12} sm={12} md={12}>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              id="demand-number"
                              style={{ backgroundColor: "#ebebeb" }}
                              InputProps={{ readOnly: true }}
                              variant="outlined"
                              label="Demand Number"
                              value={this.state.selected.demandnumber}
                              onChange={(event) => {
                                this.setState((prevState) => ({
                                  selected: {
                                    // object that we want to update
                                    ...prevState.selected, // keep all other key-value pairs
                                    demandnumber: event.target.value, // update the value of specific key
                                  },
                                }));
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              id="plan-number"
                              label="Plan number"
                              variant="outlined"
                              value={this.state.selected.plannumber}
                              onChange={(event) => {
                                this.setState((prevState) => ({
                                  selected: {
                                    // object that we want to update
                                    ...prevState.selected, // keep all other key-value pairs
                                    plannumber: event.target.value, // update the value of specific key
                                  },
                                }));
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              id="quantity"
                              fullWidth="true"
                              value={this.state.selected.demandquantity}
                              type="number"
                              variant="outlined"
                              label={
                                "Quantity (" + this.state.selected.unit + ")"
                              }
                              onChange={(event) => {
                                this.setState((prevState) => ({
                                  selected: {
                                    // object that we want to update
                                    ...prevState.selected, // keep all other key-value pairs
                                    demandquantity: event.target.value, // update the value of specific key
                                  },
                                }));
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                    </CardContent>
                  </CardM>
                  <CardM style={{ marginLeft: 15, minWidth: "57%" }}>
                    <CardContent>
                      <GridItem xs={12} sm={12} md={12}>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={8}>
                            <TextField
                              id="material"
                              select
                              label="Material"
                              fullWidth="true"
                              value={this.state.selected.name}
                              //onChange={}
                              // helperText="Your Material Name"
                              variant="outlined"
                              onChange={(event) => {
                                this.setState((prevState) => ({
                                  selected: {
                                    // object that we want to update
                                    ...prevState.selected, // keep all other key-value pairs
                                    name: event.target.value,
                                    // update the value of specific key
                                  },
                                }));

                                this.handleSetCatRmcode(event.target.value);
                              }}
                            >
                              {this.state.productsName.map((option) => (
                                <MenuItem
                                  key={option["Material"]}
                                  value={option["Material"]}
                                >
                                  {option["Material"]}
                                </MenuItem>
                              ))}
                            </TextField>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <TextField
                              variant="outlined"
                              InputProps={{ readOnly: true }}
                              label="Category"
                              value={this.state.selected.category}
                            />
                          </GridItem>
                        </GridContainer>

                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              id="pmcode"
                              select
                              label="RM Code"
                              variant="outlined"
                              fullWidth="true"
                              value={this.state.selected.pmcode}
                              // helperText="PM Code"
                              onChange={(event) => {
                                this.setState((prevState) => ({
                                  selected: {
                                    // object that we want to update
                                    ...prevState.selected, // keep all other key-value pairs
                                    pmcode: event.target.value, // update the value of specific key
                                  },
                                }));
                                this.handleSetCatMatName(event.target.value);
                              }}
                            >
                              {this.state.productsRMCode.map((option) => (
                                <MenuItem
                                  key={option.RMCode}
                                  value={option.RMCode}
                                >
                                  {option.RMCode}
                                </MenuItem>
                              ))}
                            </TextField>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            <TextField
                              variant="outlined"
                              label="Stock In Hand"
                              type="number"
                              defaultValue={"0"}
                              value={this.state.selected.stockinhand}
                              onChange={(event) => {
                                this.setState((prevState) => ({
                                  selected: {
                                    // object that we want to update
                                    ...prevState.selected, // keep all other key-value pairs
                                    stockinhand: event.target.value, // update the value of specific key
                                  },
                                }));
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                    </CardContent>
                  </CardM>
                </GridContainer>
              </CardBody>
              
                <GridContainer md={12}>
                  <GridItem>
                    <Button
                      onClick={() => {
                        let present = false;
                        for (let i = 0; i < this.state.cart.length; ++i) {
                          if (
                            this.state.cart[i].plannumber ===
                            this.state.selected.plannumber
                          ) {
                            if (
                              this.state.cart[i].name ===
                              this.state.selected.name
                            ) {
                              present = true;
                              break;
                            }
                          }
                        }
                        if (
                          this.state.selected.demandquantity === "" ||
                          this.state.selected.priority === "" ||
                          this.state.selected.name === "" ||
                          this.state.selected.pmcode === ""
                        ) {
                          alert(
                            "Please fill the form first to add product into cart."
                          );
                        } else if (present === true) {
                          alert(
                            "This pair of Plan Number and Material Name is already present in cart."
                          );
                        } else {
                          this.setState((prevState) => ({
                            selected: {
                              // object that we want to update
                              ...prevState.selected, // keep all other key-value pairs
                              id: this.state.cart.length + 1, // update the value of specific key
                            },
                          }));

                          this.updateCart();
                          this.clearForm();
                        }
                      }}
                      color="primary"
                    >
                      Add
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      disabled={this.state.canChange}
                      onClick={() => {
                        var array = [...this.state.cart];
                        var index = -1;
                        for (let i = 0; i < this.state.cart.length; ++i) {
                          if (
                            this.state.cart[i].id === this.state.selectedRows[0]
                          ) {
                            index = i;
                            break;
                          }
                        }

                        if (index !== -1) {
                          let temp = {
                            id: this.state.cart[index].id,
                            date: this.state.cart[index].date,
                            demandnumber: this.state.cart[index].demandnumber,
                            plannumber: this.state.cart[index].plannumber,
                            demandquantity:
                              this.state.cart[index].demandquantity,
                            category: this.state.cart[index].category,
                            priority: this.state.cart[index].priority,
                            pmcode: this.state.cart[index].pmcode,
                            name: this.state.cart[index].name,
                            stockinhand: this.state.cart[index].stockinhand,
                            unit: this.state.cart[index].unit,
                          };

                          this.setState({ selected: temp });
                          array.splice(index, 1);
                          this.setState({ cart: array });
                        }
                      }}
                    >
                      Change
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      disabled={this.state.canDelete}
                      onClick={() => {
                        var array = [...this.state.cart];
                        for (
                          let x = 0;
                          x < this.state.selectedRows.length;
                          ++x
                        ) {
                          var index = -1;
                          for (let i = 0; i < this.state.cart.length; ++i) {
                            if (
                              this.state.cart[i].id ===
                              this.state.selectedRows[x]
                            ) {
                              index = i;

                              break;
                            }
                          }

                          if (index !== -1) {
                            array.splice(index, 1);
                            this.setState({ cart: array });
                          }
                        }
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="default"
                      startIcon={<CloudUploadIcon />}
                      onClick={() => {
                        this.handlePostData();
                      }}
                    >
                      Post
                    </Button>
                  </GridItem>
                </GridContainer>
             
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  {/* <CardHeader color="primary">
                  <h4 >Packing Material Demand Form</h4>
                </CardHeader> */}
                  <CardBody>
                    <GridContainer>
                      <div style={{ height: 450, width: "100%" }}>
                        <DataGrid
                          rows={products_array}
                          columns={columns}
                          checkboxSelection
                          onSelectionModelChange={(event) => {
                            this.setState({ selectedRows: event });

                            if (event.length === 1) {
                              this.setState({ canChange: false });
                              this.setState({ canDelete: false });
                            } else {
                              this.setState({ canChange: true });
                              this.setState({ canDelete: true });
                            }
                          }}
                          components={{
                            Toolbar: CustomToolbar,
                          }}
                        />
                      </div>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </Card>
          </GridItem>
          {/* <GridItem xs={12} sm={12} md={4}>
            </GridItem> */}
        </GridContainer>

        {console.log("Render Completed")}
      </div>
    );
  }
}

export default PackingMaterialDemand;
