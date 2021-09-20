import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter";
import CardBody from "../../components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from "@material-ui/data-grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import BackupIcon from "@material-ui/icons/Backup";
import PrintIcon from "@material-ui/icons/Print";

export default class ViewRawMaterial extends Component {
  render() {
    const products_array = [];
    const columns = [
      {
        field: "rmcode",
        headerName: "Raw Material Code",
        width: 200,
        editable: true,
      },
      {
        field: "material",
        headerName: "Material",
        width: 320,
        editable: true,
      },
      {
        field: "unit",
        headerName: "Unit",
        width: 180,
        editable: true,
      },
      {
        field: "type",
        headerName: "Type",
        width: 180,
        editable: true,
      },
      
    ];
    return (
      <div
      style={{
               
        marginTop: "50px",
       
    }}
      >
        <GridContainer md={12}>
          <Card>
            <CardHeader
              color="primary"
              
            >
              <h2 style={{ textAlign: "center" }}>View Raw Material</h2>
            </CardHeader>
            <CardBody style={{ marginLeft: 15, minWidth: 960 }}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Raw Material Code:"}
                    select
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Material:"}
                    select
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Unit:"}
                    select
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Category:"}
                    select
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <GridContainer>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth="true"
                      startIcon={<PrintIcon />}
                    >
                      Print
                    </Button>
                  </GridContainer>
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer>
                    <div style={{ height: 450, width: "100%" }}>
                      <DataGrid
                        rows={products_array}
                        columns={columns}
                        checkboxSelection
                        disableSelectionOnClick
                      />
                    </div>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
