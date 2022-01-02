import React, { Component } from "react";
// import {getRMDemandHighestDNo, RawMaterialNames ,RawMaterialCodes,RawMaterialSearchByRMCode,RawMaterialSearchByName,RMDemands} from "../Services/Inventory/inventory.js";

import { AddSupplier} from '../Services/QA/Add_Supplier';

class Products extends Component{
async componentDidMount() {
    

//  Post GRN Testing
    // const GRNoListData=await RawMaterialCodesppliers();
    // console.log(GRNoListData.data);

    // const details=await RMRecievingDetailByGRNo(1);
    // console.log(details.data);

  //  const ok=await  AddSupplier(
  //   {
  //     "S_Name": "temp2",
  //     "S_Email": "user@example.com",
  //     "S_Address": "Home",
  //     "S_City": "lhr",
  //     "S_Country": "Pak",
  //     "S_Phone": "string",
  //     "contactPersonName": "Usama",
  //     "contactPersonPhone": "000222"
  //   });
  //     console.log("Post :"+ok.data)    
  }
  render()
  {
    return(
        <h2>Hi</h2>
    )
  }
}

export default Products;