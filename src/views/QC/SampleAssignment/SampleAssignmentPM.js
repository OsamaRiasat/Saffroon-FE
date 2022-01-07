import React, { Component } from "react";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { DataGrid } from "@material-ui/data-grid";
import RMSamples from "../../../Services/QC/PM/PM_Sample_Assignment.js";
import PrintIcon from "@material-ui/icons/Print";
import MenuItem from "@material-ui/core/MenuItem";
import { toast } from "react-toastify";
import {
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import Select from "react-select";
import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../../variables/genericVariables";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
export default class SampleAssignmentRaw extends Component {
  async componentDidMount() {
    const samples = (await RMSamples.methods.RMSamples()).data;
    console.log(samples);
    this.setState({
      samples: samples,
    });
    const analysts = (await RMSamples.methods.Analysts()).data;
    console.log(analysts);
    this.setState({
      analysts: analysts,
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      samples: [],
      analysts: [],
      assignedSamples: [],
      analystSamplesid: "",
      analyst: "",
      selectedRowQC: "",
      canAssign: false,
      analystAssignedid: "",
      analystAssigned: "",
      selectedqc: "",
    };
  }
  handleShowassignedSamples = async (id) => {
    const data = (await RMSamples.methods.AnalystSample(id)).data;
    console.log(data);
    this.setState({
      assignedSamples: data,
    });
  };
  handleAssignQC = async () => {
    console.log(this.state.selectedRowQC[0], this.state.analystAssignedid);
    const payload = {
      analyst: this.state.analystAssignedid,
    };
    var data = null;
    data = (
      await RMSamples.methods.AssignAnalyst(
        this.state.selectedRowQC[0],
        payload
      )
    ).data;
    console.log(data);
    if (data) {
      const samples = (await RMSamples.methods.RMSamples()).data;
      console.log(samples);
      this.setState({
        samples: samples,
      });
      const ananame = this.state.analysts.find(
        (e) => e.id === this.state.analystAssignedid
      );
      // console.log(ananame);
      toast.success("Assigned QC No=" + this.state.selectedRowQC[0] + " to " + ananame.username, {
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
   
    const samples_array = [];
    for (let i = 0; i < this.state.samples.length; ++i) {
      let temp = {
        id: this.state.samples[i].QCNo,
        qc: this.state.samples[i].QCNo,
        date: this.state.samples[i].Date,
        material: this.state.samples[i].Material,
        qtyunit:
          this.state.samples[i].Quantity + " " + this.state.samples[i].Unit,
        Analyst: this.state.samples[i].Analyst,
        assignmentDate: this.state.samples[i].AssigneDate,
      };
      samples_array.push(temp);
    }

    const assigned_array = [];
    for (let i = 0; i < this.state.assignedSamples.length; ++i) {
      let temp = {
        id: this.state.assignedSamples[i].QCNo,
        qc: this.state.assignedSamples[i].QCNo,
        date: this.state.assignedSamples[i].assignedDateTime,
        material: this.state.assignedSamples[i].Material,
        status: this.state.assignedSamples[i].status,
      };
      assigned_array.push(temp);
    }

    const columnsTable1 = [
      {
        field: "qc",
        headerName: "QC#",
        width: 110,
        editable: true,
      },
      {
        field: "material",
        headerName: "Material",
        width: 140,
        editable: true,
      },
      {
        field: "date",
        headerName: "Date",
        width: 155,
        editable: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 180,
        editable: true,
      },
    ];

    const columns = [
      {
        field: "qc",
        headerName: "QC#",
        width: 140,
      },
      {
        field: "date",
        headerName: "Date",
        width: 110,
      },
      {
        field: "material",
        headerName: "Material",
        width: 140,
      },
      {
        field: "qtyunit",
        headerName: "Qty Unit",
        width: 140,
      },
      {
        field: "Analyst",
        headerName: "Analyst",
        width: 125,
      },
      {
        field: "assignmentDate",
        headerName: "Assignment Date",
        width: 200,
      },
    ];

    return (
      <div style={{ marginTop: 50 }}>
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h2 >Sample Assignment Packing Material </h2>
             
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer style={{ marginLeft: 15 }}>
                      <GridItem xs={12} sm={12} md={12}>
                      <Select
                    placeholder="Select Analyst to view assigned tasks"
                    className="customSelect"
                    classNamePrefix="select"
                    name="analysts"
                    components={{
                      ValueContainer: CustomValueContainer,
                    }}
                    styles={CustomSelectStyle}
                    isSearchable={true}
                    options={this.state.analysts.map((t) => ({
                      value: t.id,
                      label: t.username,
                    }))}
                    value={
                      this.state.analyst ? { label: this.state.analyst } : null
                    }
                    getOptionValue={(option) => option.value}
                    getOptionLabel={(option) => option.label}
                    onChange={(value) => {
                      this.setState({
                        analystSamplesid: value.value,
                        analyst: value.label,
                      });
                      
                      this.handleShowassignedSamples(value.value);
                    }}
                 
                  />
                      </GridItem>
                    </GridContainer>
                    {/* <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Button color="primary" startIcon={<PrintIcon />}>
                          Print
                        </Button>
                      </GridItem>
                    </GridContainer> */}
                  </GridItem>
                </GridItem>

                <GridItem xs={12} sm={12} md={8}>
                  <GridContainer>
                    <div style={{ height: 300, width: "100%" }}>
                      <DataGrid
                        rows={assigned_array}
                        columns={columnsTable1}
                        components={{
                          Toolbar: CustomToolbar,
                        }}
                        disableSelectionOnClick
                      />
                    </div>
                  </GridContainer>
                </GridItem>
              </GridContainer>

              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="QC# "
                          InputProps={{ readOnly: true }}
                          value={this.state.selectedqc}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                      <Select
                    placeholder="Analysts"
                    className="customSelect"
                    classNamePrefix="select"
                    name="analysts"
                    components={{
                      ValueContainer: CustomValueContainer,
                    }}
                    styles={CustomSelectStyle}
                    isSearchable={true}
                    options={this.state.analysts.map((t) => ({
                      value: t.id,
                      label: t.username,
                    }))}
                    value={
                      this.state.analystAssigned ? { label: this.state.analystAssigned } : null
                    }
                    getOptionValue={(option) => option.value}
                    getOptionLabel={(option) => option.label}
                    onChange={(value) => {
                      this.setState({
                        analystAssignedid: value.value,
                        analystAssigned: value.label,
                      });
                      
                      
                    }}
                 
                  />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth="true"
                          disabled={!this.state.canAssign}
                          onClick={() => {
                            this.handleAssignQC();
                          }}
                        >
                          Assign
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardBody>
                    <GridContainer>
                      <div style={{ height: 450, width: "100%" }}>
                        <DataGrid
                          rows={samples_array}
                          columns={columns}
                          checkboxSelection
                          disableSelectionOnClick
                          onSelectionModelChange={(event) => {
                            this.setState({ selectedRowQC: event });
                            console.log(event);

                            if (event.length === 1) {
                              this.setState({ canAssign: true });
                            }
                            this.setState({
                              selectedqc: event[0],
                            });
                            if (event.length === 0) {
                              this.setState({ selectedqc: "" });
                            }

                            // else {
                            //   this.setState({ canChange: true })
                            //   this.setState({ canDelete: true })
                            // }
                          }}
                        />
                      </div>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
