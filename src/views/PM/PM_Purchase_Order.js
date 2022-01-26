import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { DataGrid } from "@material-ui/data-grid";
import { toast } from "react-toastify";

import {
  highestPurchaseOrderNo,
  demandNumberList,
  suppliersData,
  supplierApprovedMaterial,
  materialCodes,
  material,
  materialByCode,
  postPurchaseOrder,
  DemandedMaterialsByDemandNo,
} from "../../Services/Inventory/PM/PM_PurchaseOrder.js";

class PurchaseOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highestPurchaseOrderNumber: "",
      demandNumberList: [],
      selectedDemandNumber: "",
      suppliersData: [],
      selectedSupplierName: "",
      selectedSupplierId: "",
      materialCodes: [],
      selectedRawMaterialCode: "",
      selectedMaterial: [],
      quantity: "",
      rateUnitPkr: "",
      totalValue: "",
      deliveryDate: "",
      purchaseOrderCart: [],

      cart: [],

      suppliersApprovedMaterialsDetail_List: [],
      demandedDetail_List: [],
    };
  }

  componentDidMount() {
    this.getHighestPurchaseOrderNumber();
    this.getDemandNumberList();
    this.getSupliersData();
  }

  async getDemandedMaterialsByDemandNo(data) {
    const res = (await DemandedMaterialsByDemandNo(data)).data;
    this.setState({ demandedDetail_List: res });
  }

  async getHighestPurchaseOrderNumber() {
    const res = (await highestPurchaseOrderNo()).data;
    this.setState({ highestPurchaseOrderNo: res.PONo__max +1});
  }

  async getDemandNumberList() {
    const res = (await demandNumberList()).data;
    this.setState({ demandNumberList: res });
  }

  async getSupliersData() {
    const res = (await suppliersData()).data;
    this.setState({ suppliersData: res });
  }

  async getApprovedMaterialList(data) {
    const res = (await supplierApprovedMaterial(data)).data;
    this.setState({ suppliersApprovedMaterialsDetail_List: res });
  }

  async getMaterialCodes(DNO, SID) {
    let data = {
      DNo: DNO,
      SID: SID,
    };
    const res = (await materialCodes(data)).data;
    this.setState({ materialCodes: res });
  }

  async getMaterial(DNO, SID) {
    let data = {
      DNo: DNO,
      SID: SID,
    };
    const res = (await material(data)).data;
    // this.setState({ materialCodes: res });
    console.log(res);
  }

  async getMaterialByCode(code) {
    const res = (await materialByCode(code)).data;
    this.setState({ selectedMaterial: res[0] });
  }

  handleAdd() {
    if (
      this.state.purchaseOrderCart.PO_ITEMS == undefined ||
      this.state.purchaseOrderCart.length == 0
    ) {
      let data = {
        DNo: this.state.selectedDemandNumber,
        PO_ITEMS: [
          {
            SID: this.state.selectedSupplierId,
            RMCode: this.state.selectedRawMaterialCode,
            Quantity: this.state.quantity,
            Material: this.state.selectedMaterial.Material,
            Unit: this.state.selectedMaterial.Units,
            RateUnitPkr: this.state.rateUnitPkr,
            TotalValue: this.state.totalValue,
            DeliveryDate: this.state.deliveryDate,
          },
        ],
      };
      this.setState({ purchaseOrderCart: data });
    } else {
      let data = {
        SID: this.state.selectedSupplierId,
        RMCode: this.state.selectedRawMaterialCode,
        Quantity: this.state.quantity,
        Material: this.state.selectedMaterial.Material,
        Unit: this.state.selectedMaterial.Units,
        RateUnitPkr: this.state.rateUnitPkr,
        TotalValue: this.state.totalValue,
        DeliveryDate: this.state.deliveryDate,
      };
      this.state.purchaseOrderCart.PO_ITEMS.push(data);
    }
  }

  clearForm = () => {
    this.setState({
      highestPurchaseOrderNumber: "",
      demandNumberList: [],
      selectedDemandNumber: "",
      suppliersData: [],
      selectedSupplierName: "",
      selectedSupplierId: "",
      materialCodes: [],
      selectedRawMaterialCode: "",
      selectedMaterial: [],
      quantity: "",
      rateUnitPkr: "",
      totalValue: "",
      deliveryDate: "",
      purchaseOrderCart: [],

      cart: [],

      suppliersApprovedMaterialsDetail_List: [],
      demandedDetail_List: [],
    });
    this.getHighestPurchaseOrderNumber();
    this.getDemandNumberList();
    this.getSupliersData();
  };

  handlePost = async () => {
    try {
      const payload2 = {
        DNo: this.state.selectedDemandNumber,
        PO_ITEMS: [
          {
            SID: this.state.selectedSupplierId,
            PMCode: this.state.selectedRawMaterialCode,
            Quantity: this.state.quantity,
          },
        ],
      };

      console.log(payload2);

      const res = await postPurchaseOrder(payload2);
      console.log(res);
      if (res.status === 201) {
        toast.success("Request Sent !!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.clearForm();
      } else {
        toast.error("Request Not Sent", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  render() {
    const products_array = [];
    var count = 0;
    for (
      let i = 0;
      i < this.state.suppliersApprovedMaterialsDetail_List.length;
      ++i
    ) {
      count = count + 1;
      let temp = {
        id: count,
        materialName:
          this.state.suppliersApprovedMaterialsDetail_List[i].Material,
      };
      products_array.push(temp);
    }
    const columns = [
      {
        field: "materialName",
        headerName: "Approved Material",
        width: 350,
        editable: true,
      },
    ];

    const products_array2 = [];
    var count2 = 0;
    for (let i = 0; i < this.state.demandedDetail_List.length; ++i) {
      count2 = count2 + 1;
      let temp2 = {
        id: count2,
        RMCode: this.state.demandedDetail_List[i].PMCode,
        Material: this.state.demandedDetail_List[i].Material,
        Priority: this.state.demandedDetail_List[i].Priority,
        DemandedQuantity: this.state.demandedDetail_List[i].DemandedQty,
      };
      products_array2.push(temp2);
    }
    const columns2 = [
        {
            field: "Material",
            headerName: "RMCode",
            width: 450  ,
            
          },
      {
        field: "RMCode",
        headerName: "RMCode",
        width: 150,
        
      },
      {
        field: "Priority",
        headerName: "Priority",
        width: 150,
    
      },
      {
        field: "DemandedQuantity",
        headerName: "Demanded QTY",
        width: 250,
    
      },
    ];

    const columns4 = ["Sr#", "Name", "Role"];
    return (
      <div style={{ marginTop: 50 }}>
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h2 style={{ textAlign: "center" }}> Puchase Order </h2>
            </CardHeader>
            <CardBody style={{ marginLeft: 15, minWidth: 960 }}>
              <GridContainer>
                <Card>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="po-number"
                          variant="outlined"
                          label="P.O No."
                          fullWidth="true"
                          InputProps={{ readOnly: true }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={this.state.highestPurchaseOrderNo}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="demand-number"
                          variant="outlined"
                          label="Demand No."
                          fullWidth="true"
                          select
                          onChange={(event) => {
                            this.setState({
                              selectedDemandNumber: event.target.value,
                            });
                            console.log(this.state.selectedSupplierId);
                            console.log(this.state.selectedDemandNumber);
                            if (
                              event.target.value != "" &&
                              this.state.selectedSupplierId != ""
                            ) {
                              this.getMaterialCodes(
                                event.target.value,
                                this.state.selectedSupplierId
                              );
                              // this.getMaterial(event.target.value, this.state.selectedSupplierId);
                            }
                            this.getDemandedMaterialsByDemandNo(
                              event.target.value
                            );
                          }}
                        >
                          {this.state.demandNumberList.map((data) => (
                            <MenuItem key={data.DNo} value={data.DNo}>
                              {data.DNo}
                            </MenuItem>
                          ))}
                        </TextField>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <GridContainer>
                          <div style={{ height: 250, width: "100%" }}>
                            <DataGrid
                              rows={products_array2}
                              columns={columns2}
                              disableSelectionOnClick
                            />
                          </div>
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  </CardContent>
                </Card>
                <CardM style={{ minWidth: 450 }}>
                  <CardHeader color="primary">
                    <h4>Supplier's Details</h4>
                  </CardHeader>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          id="supplier-id"
                          variant="outlined"
                          label="Supplier ID"
                          fullWidth="true"
                          select
                          SelectProps={{
                            value: [this.state.selectedSupplierId],
                          }}
                          onChange={(event) => {
                            let selectedName = this.state.suppliersData.filter(
                              (e) => e.S_ID == event.target.value
                            )[0].S_Name;
                            this.setState({
                              selectedSupplierName: selectedName,
                              selectedSupplierId: event.target.value,
                            });
                            this.getApprovedMaterialList(event.target.value);
                            if (
                              this.state.selectedDemandNumber != "" &&
                              event.target.value != ""
                            ) {
                              this.getMaterialCodes(
                                this.state.selectedDemandNumber,
                                event.target.value
                              );
                              // this.getMaterial(this.state.selectedDemandNumber, event.target.value);
                            }
                          }}
                        >
                          {this.state.suppliersData.map((data) => (
                            <MenuItem key={data.S_ID} value={data.S_ID}>
                              {data.S_ID}
                            </MenuItem>
                          ))}
                        </TextField>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={8}>
                        <TextField
                          id="supplier-name"
                          variant="outlined"
                          label="Supplier Name"
                          fullWidth="true"
                          select
                          SelectProps={{
                            value: [this.state.selectedSupplierName],
                          }}
                          onChange={(event) => {
                            let selectedId = this.state.suppliersData.filter(
                              (e) => e.S_Name == event.target.value
                            )[0].S_ID;
                            this.setState({
                              selectedSupplierId: selectedId,
                              selectedSupplierName: event.target.value,
                            });
                            this.getApprovedMaterialList(selectedId);
                            console.log(this.state.selectedDemandNumber);
                            console.log(selectedId);
                            if (
                              this.state.selectedDemandNumber != "" &&
                              selectedId != ""
                            ) {
                              this.getMaterialCodes(
                                this.state.selectedDemandNumber,
                                selectedId
                              );
                              // this.getMaterial(this.state.selectedDemandNumber, selectedId);
                            }
                            // this.getApprovedMaterialList(event.target.value);
                          }}
                        >
                          {this.state.suppliersData.map((data) => (
                            <MenuItem key={data.S_Name} value={data.S_Name}>
                              {data.S_Name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </GridItem>
                    </GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <GridContainer>
                        <div style={{ height: 220, width: "100%" }}>
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
                <CardM style={{ marginLeft: 15, minWidth: 550 }}>
                  <CardHeader color="primary">
                    <h4>Material Details</h4>
                  </CardHeader>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="material-code"
                          variant="outlined"
                          label="Material Code"
                          fullWidth="true"
                          select
                          onChange={(event) => {
                            console.log(event.target.value);
                            this.setState({
                              selectedRawMaterialCode: event.target.value,
                            });
                            this.getMaterialByCode(event.target.value);
                          }}
                        >
                          {this.state.materialCodes.map((data) => (
                            <MenuItem key={data.RMCode} value={data.RMCode}>
                              {data.RMCode}
                            </MenuItem>
                          ))}
                        </TextField>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="material-name"
                          variant="outlined"
                          label="Material Name"
                          InputProps={{ readOnly: true }}
                          fullWidth="true"
                          value={this.state.selectedMaterial.Material}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="quanity"
                          variant="outlined"
                          label="Quantity"
                          fullWidth="true"
                          onChange={(event) => {
                            this.setState({ quantity: event.target.value });
                          }}
                          // value={this.state.ccn}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="rate-unit"
                          variant="outlined"
                          label="Rate/Unit(PKR)"
                          fullWidth="true"
                          onChange={(event) => {
                            this.setState({ rateUnitPkr: event.target.value });
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="total-value"
                          variant="outlined"
                          label="Total Value"
                          fullWidth="true"
                          onChange={(event) => {
                            this.setState({ totalValue: event.target.value });
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="delivery-date"
                          variant="outlined"
                          // label="Delivery Date"
                          fullWidth="true"
                          type="date"
                          onChange={(event) => {
                            this.setState({ deliveryDate: event.target.value });
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardContent>
                </CardM>
              </GridContainer>
              <GridContainer>
                <GridItem>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth="true"
                    onClick={(event) => {
                      this.handleAdd();
                    }}
                  >
                    Add
                  </Button>
                </GridItem>
                <GridItem>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth="true"
                    onClick={(event) => {
                      this.handlePost();
                    }}
                  >
                    Save
                  </Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
        <GridContainer md={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Material Code</TableCell>
                  <TableCell>Material</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Rate/Unit</TableCell>
                  <TableCell>Total Value</TableCell>
                  <TableCell>Delivery Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.purchaseOrderCart.PO_ITEMS != undefined &&
                  this.state.purchaseOrderCart.PO_ITEMS.map((row, index) => {
                    return (
                      <TableRow key={row.RMCode}>
                        <TableCell component="th" scope="row">
                          {row.RMCode}
                        </TableCell>
                        <TableCell>{row.Material}</TableCell>
                        <TableCell>{row.Unit}</TableCell>
                        <TableCell>{row.Quantity}</TableCell>
                        <TableCell>{row.RateUnitPkr}</TableCell>
                        <TableCell>{row.TotalValue}</TableCell>
                        <TableCell>{row.DeliveryDate}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </GridContainer>
      </div>
    );
  }
}
export default PurchaseOrder;
