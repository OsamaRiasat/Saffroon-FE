import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "QualityAssurance/";   // Its production intentially
const Endpoint = apiUrl + data;

export default {
  methods: {
    

        // RESPONSE
    // [
    //     {
    //       "ProductCode": "BS"
    //     }
    //   ]
    // list of PRODUCT CODES
    BRPCode() {
        console.log("Getting BRPCode");
        const resp = http.get(Endpoint + "BRPCode/");
        console.log(resp);
        return resp;
      },


        //RESPONSE
    //   [
    //     {
    //       "batchNo": "BS01"
    //     }
    //   ]
      // When the ProductCode is selected call this API
      BRBatchNo(PCode) {
        console.log("GetttingBatchNo");
        const resp = http.get(Endpoint + "BRBatchNo/"+PCode+"/");
        console.log(resp);
        return resp;
      },


        //RESPONSE
    //   {
    //     "MFGDate": "2021-08-31",
    //     "EXPDate": "2021-08-31",
    //     "batchStatus": "UNDER_REVIEWED",
    //     "batchSize": 40000,
    //     "yieldPercentage": null,
    //     "inProcess": null,
    //     "packed": 4000
    //   }
      BRBatchDetail(batchNo) {
        console.log("Getting BRBatchDetail");
        const resp = http.get(Endpoint + "BRBatchDetail/"+batchNo+"/");
        console.log(resp);
        return resp;
      },
      
        //REQUESt BODY
    //   {
    //     "dispatchPermission": "string",
    //     "permittedDispatch": "string",
    //     "remarks": "string",
    //     "batchNo": "string"
    //   }

      //RESPONSE
    //   {
    //     "BRNo": 0,
    //     "date": "2021-09-07",
    //     "dispatchPermission": "string",
    //     "permittedDispatch": "string",
    //     "remarks": "string",
    //     "batchNo": "string"
    //   }
    // // Post Button when alll the fiels(remarks is not required) are filled 
    BRDetail(obj) {

        console.log("Posting BRDetail")
        const resp = http.post(Endpoint + "BRDetail/", obj);
        console.log(resp);
        return resp;
    
    },



  },

};
