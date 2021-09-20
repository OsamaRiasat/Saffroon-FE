import http from "../http/httpService.js"
import {apiUrl} from "../../config.json" 


const data="inventory/"
const Endpoint=apiUrl+data 

export default {

  methods:{  
    RMHighestIGPNO(){
      const resp = http.get(Endpoint+"RMHighestIGPNO");
      // console.log("RMHighestIGPNO"+resp.data)
      return resp
    },
    RMPurchaseOrderPONOsWithPendingStatus(){
        const resp = http.get(Endpoint+"RMPurchaseOrderPONOsWithPendingStatus/");
        // console.log("RMPurchaseOrderPONOsWithPendingStatus"+resp.data)
        return resp
      }
      ,
      RMPurchaseOrderItemsCodesForReceiving(PONo){
        const resp = http.get(Endpoint+"RMPurchaseOrderItemsCodesForReceiving/"+PONo);
        console.log("RMPurchaseOrderItemsCodesForReceiving"+resp.data)
        return resp
      }
      ,
      RMPurchaseOrderDetails(PONo,RMCode){
        const resp = http.get(Endpoint+"RMPurchaseOrderDetails/"+PONo+"/"+RMCode);
        console.log("RMPurchaseOrderDetails"+resp.data)
        return resp
      }
      ,
      RMIGP(data){
        const resp = http.post(Endpoint+"RMIGP",data);
        return resp
      }


}



}


// RM IGP RMIGP/


