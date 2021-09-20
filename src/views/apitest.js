import React, { Component } from "react";
import {getRMDemandHighestDNo, RawMaterialNames ,RawMaterialCodes,RawMaterialSearchByRMCode,RawMaterialSearchByName,RMDemands} from "../Services/Inventory/inventory.js";

// RM IGP
import IGP from "../Services/Inventory/RM_IGP.js";


// RM GRN
import GRN from "../Services/Inventory/GRN.js";


// Post GRN

import postGRN from "../Services/Inventory/Post_GRN.js";
import Post_GRN from "../Services/Inventory/Post_GRN.js";

//import {RMHighestIGPNO} from "../Services/Inventory/inventory.js";
class Products extends Component{
async componentDidMount() {
    

//  Post GRN Testing
    const GRNoList=await Post_GRN.methods.GRNoList();
    console.log(GRNoList.data);

    const details=await Post_GRN.methods.RMRecievingDetailByGRNo(1);
    console.log(details.data);

   const ok=await  Post_GRN.methods.RMBinCard(
      {
        
        "GRNo": 1,

      });
      console.log("RmBinCard :"+ok.data)

// GRN Testing
   
  //   const IGPData=await GRN.methods.RMHighestGRNo();
  //   console.log(IGPData.data);
  //   const IGNoList=await GRN.methods.IGPNoList();
  //   console.log(IGNoList.data);
  //   const RMRecievingDetail=await GRN.methods.RMRecievingDetail(1);
  //   console.log(RMRecievingDetail.data);
  //   const ok=await  GRN.methods.UpdateRMRecieving(1,
  //     {
  //       "batchNo": "7235",
  //       "quantityReceived": "32",
  //       "containersReceived": 13,
  //       "MFG_Date": "2021-08-11",
  //       "EXP_Date": "2021-08-11",
  //       "GRNo": 3,
  //       "remarks": "from swagger"
  //     });

  // IGP Testing
    
  //  console.log("Status :"+ ok.data);

    //console.log("in component")
    // const products = await getRMDemandHighestDNo();
    // const rmmaterial=await RawMaterialNames();
    // const rmmaterialcodes=await RawMaterialCodes();
    // const rmmaterialbycode=await RawMaterialSearchByRMCode("2.01.001.00145");
    //const IGPData=await IGP.methods.RMHighestIGPNO();
    // const PS=await IGP.methods.RMPurchaseOrderPONOsWithPendingStatus();
    // const RList=await IGP.methods.RMPurchaseOrderItemsCodesForReceiving(2);
    // const RR=await IGP.methods.RMPurchaseOrderDetails(2,"RM0007");
    // const ig=await  IGP.methods.RMIGP(
    //   {
    //     "RMCode": "RM0006",
    //     "quantityReceived": "32.32",
    //     "containersReceived": 24,
    //     "batchNo": "YY329",
    //     "PONo": 2,
    //     "S_ID": 2
    //   });
    
  
    // // const rmmaterialbyname=await  RMDemands({
    // //     "demandedItems": [
    // //       {
    // //         "RMCode": "2.01.001.00127",
    // //         "Priority": "Never",
    // //         "DemandedQty": 20
    // //       }
    // //     ]
    // //   });
    // // const rmdemand=await RMDemands({});
    
    // console.log(products.data);
    // console.log(rmmaterial.data);
    // console.log(rmmaterialcodes.data);
    // console.log(rmmaterialbycode.data);
    
    // console.log(PS.data);
    // console.log(RList.data);
    // console.log(RR.data);
    // console.log(ig)
    // // console.log(rmmaterialbyname.data);
    // // console.log(rmdemand);
    
   
    
  }
  render()
  {
    return(
        <h2>Hi</h2>
    )
  }
}

export default Products;