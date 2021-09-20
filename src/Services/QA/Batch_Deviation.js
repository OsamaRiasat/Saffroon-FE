import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "QualityAssurance/";   // Its production intentially
const Endpoint = apiUrl + data;

export default {
  methods: {
    

   

    // Show HighestCCNo + 1 on the form
    HighestBDNo() {
        console.log("Getting HighestBDNo");
        const resp = http.get(Endpoint + "HighestBDNo/");
        console.log(resp);
        return resp;
      },

    // List of Product Codes
    ProductCode() {
        console.log("Getting ProductCode");
        const resp = http.get(Endpoint + "ProductCode/");
        console.log(resp);
        return resp;
      },

      // When the ProductCode is selected call this API
      BatchNo(PCode) {
        console.log("GetttingBatchNo");
        const resp = http.get(Endpoint + "BatchNo/"+PCode+"/");
        console.log(resp);
        return resp;
      },
      BatchDetail(batchNo) {
        console.log("Getting BatchDetail");
        const resp = http.get(Endpoint + "BatchDetail/"+batchNo+"/");
        console.log(resp);
        return resp;
      },
      
    
    //   {
    //     "stage": "OPEN",    // will be open everytime
    //     "keyword": "string",
    //     "descriptionOfDeviation": "string",
    //     "actionTaken": "string",
    //     "batchNo": "string"
    //   }
    // Post Button
    BatchDeviation(obj) {

        console.log("Posting NCR")
        const resp = http.post(Endpoint + "BatchDeviation/", obj);
        console.log(resp);
        return resp;
    
    },



  },

};
