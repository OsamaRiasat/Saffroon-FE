import React, { Component } from 'react'
import ProductsSelection from './PM_ProductsSelection';
import MaterialPlan from './PM_MaterialPlan'
import ProductionPlan from './ProductionPlan'

class planning extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            formno: 1,
        }
        this.form_handle = this.form_handle.bind(this);
        this.handle_plan = this.handle_plan.bind(this);
        sessionStorage.setItem("isPlanSaved",true)
    }


    handle_plan(num) {
        this.setState({planno: num})
    }

    form_handle(num) {
        this.setState({ formno: num });
    }

    render() {
        if (this.state.formno == 1) {
            return <ProductsSelection form_handle={this.form_handle} planno={this.state.planno} handle_plan={this.handle_plan}/>
        }
        else if (this.state.formno == 2) {
            return <MaterialPlan form_handle={this.form_handle} planno={this.state.planno}/>
        }
        else if (this.state.formno == 3) {
            return <ProductionPlan form_handle={this.form_handle} planno={this.state.planno}/>
        }
    }
}
export default planning