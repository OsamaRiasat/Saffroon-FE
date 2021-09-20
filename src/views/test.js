import { Dropdown } from 'bootstrap';
import React, { Component } from 'react'

class test extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            products: [
                {
                    'name': 'idk',

                }
            ]
        }
    }

    createSelectItems() {
        let items = [];
        for (let i = 0; i <= 4; i++) {
            items.push(<option key={i} value={i}>{i}</option>);
            //here I will be creating my options dynamically based on
            //what props are currently passed to the parent component
        }
        return items;
    }

    onDropdownSelected(e) {
        console.log("THE VAL", e.target.value);
        //here you will see the current selected value of the select input
    }


    render() {
        return (<div>
            
        </div>);
    }
}
export default test