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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DataGrid } from "@material-ui/data-grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import BackupIcon from "@material-ui/icons/Backup";
import PrintIcon from "@material-ui/icons/Print";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import AlertModal from '../../components/Modal/AlertModal';

import { AddRawMaterial } from '../../Services/QA/RawMaterial_Add';

export default class addrawmaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: ["g", "mg", "kg", "numbers"],
      category: ["Active", "Excipient"],

      rawMaterialCode: "",
      material: "",

      selected: {
        unit: "",
        category: "",
      },
      showSuccess: false,
      showError: false,
      message: ''
    };
  }

  clearForm = () => {
    this.setState({
        rawMaterialCode:"",
        material:"",
        
    });
    this.setState((prevState) => ({
        selected: {
          ...prevState.selected,
          unit: "", 
          category: "",
        },
      }));
  };
  
  postButton = async () => {
    const payload = {
      RMCode: this.state.rawMaterialCode,
      Material: this.state.material,
      Units: this.state.selected.unit,
      Type: this.state.selected.category,
    };
    if(payload.RMCode == '' || payload.Material == '' || payload.Units == '' || payload.Type == '') {
      this.setState({
        showError: true,
        showSuccess: false,
        message: 'All fields of raw material are required.'
      });
    } else {
      const data = await AddRawMaterial(payload);
      if (data.status === 201) {
        this.setState({
          showSuccess: true,
          showError: false,
          message: 'Raw material'
        });
        this.clearForm();
      } else {
        this.setState({
          showError: true,
          showSuccess: false,
          message: 'Something went wrong from server side.'
        });
      }
    }
  }

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
              <h2 style={{ textAlign: "center" }}>Add Raw Material</h2>
            </CardHeader>
            <CardBody style={{ marginLeft: 15, minWidth: 960 }}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Raw Material Code:"}
                    value={this.state.rawMaterialCode}
                    onChange={(event) => {
                      this.setState({
                        rawMaterialCode: event.target.value,
                      });
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Material:"}
                    value={this.state.material}
                    onChange={(event) => {
                      this.setState({
                        material: event.target.value,
                      });
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                <Autocomplete
                  id="unit"
                  options={this.state.unit}
                  getOptionLabel={(option) => option}
                  onChange={(event, value) => {
                    this.setState((prevState) => ({
                      selected : {
                        ...prevState.selected,
                        unit: value
                      }
                    }))
                  }}
                  renderInput={(params) => <TextField {...params} label="Unit:" variant="outlined" />}
                />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Category:"}
                    select
                    value={this.state.selected.category}
                    onChange={(event) => {
                      this.setState((prevState) => ({
                        selected: {
                          // object that we want to update
                          ...prevState.selected, // keep all other key-value pairs
                          category: event.target.value, // update the value of specific key
                        },
                      }));
                    }}
                  >
                    {this.state.category.map((pri) => (
                      <MenuItem key={pri} value={pri}>
                        {pri}
                      </MenuItem>
                    ))}
                  </TextField>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth="true"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={this.postButton}
                  >
                    Add Raw Material
                  </Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer> 
        {(this.state.showSuccess == true || this.state.showError == true) && (<AlertModal
          showOpen={this.state.showSuccess || this.state.showError}
          message={this.state.message}
          success={this.state.showSuccess}
          error={this.state.showError}
        />)}
      </div>
    );
  }
}
