import React, { Component } from "react";
import ProductsSelection from "./ProductsSelection";
import MaterialPlan from "./MaterialPlan";
import ProductionPlan from "./ProductionPlan";
import {
  ProductCodes,
  highestPlanNo,
} from "../../Services/Planning/A-Product_Selection";

class planning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planno: "",
      formno: 1,
    };
    this.form_handle = this.form_handle.bind(this);
    this.handle_plan = this.handle_plan.bind(this);
    sessionStorage.setItem("isPlanSaved", true);
  }
  async componentDidMount() {
    const pc = (await highestPlanNo()).data;
    console.log(pc.planNo__max);
    this.setState({ planno: pc.planNo__max });
  }

  handle_plan(num) {
    this.setState({ planno: num });
  }

  form_handle(num) {
    this.setState({ formno: num });
  }

  render() {
    if (this.state.formno == 1) {
      return (
        <ProductsSelection
          form_handle={this.form_handle}
          planno={this.state.planno}
          handle_plan={this.handle_plan}
        />
      );
    } else if (this.state.formno == 2) {
      return (
        <MaterialPlan
          form_handle={this.form_handle}
          planno={this.state.planno}
        />
      );
    } else if (this.state.formno == 3) {
      return (
        <ProductionPlan
          form_handle={this.form_handle}
          planno={this.state.planno}
        />
      );
    }
  }
}
export default planning;
