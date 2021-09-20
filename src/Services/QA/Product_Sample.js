import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "QualityAssurance/";   // Its products intentially
const Endpoint = apiUrl + data;

export default {
  methods: {

    //Response
    // [
    //     {
    //       "ProductCode": "BS"
    //     }
    //   ]
    //List of product codes
    PSPCode() {
      console.log("Gettting PSPCode");
      const resp = http.get(Endpoint + "PSPCode/");
      console.log(resp);
      return resp;
    },

        //Response
    // [
    //     {
    //       "batchNo": "BS02"
    //     }
    //   ]
    // When ProductCode is selected
    PSBatchNo(Pcode) {
        console.log("Gettting PSBatchNo");
        const resp = http.get(Endpoint + "PSBatchNo/" + Pcode + "/");
        console.log(resp);
        return resp;
    },

            //Response
        // {
        //     "MFGDate": "2021-09-01",
        //     "EXPDate": "2021-09-01",
        //     "currentStage": "Blistering",
        //     "batchSize": 4000,
        //     "QCNo": "FP21091921"
        //   }
    
    // When Batch No is selected
    PSBatchDetail(batchNo) {
        console.log("Gettting PSBatchDetail");
        const resp = http.get(Endpoint + "PSBatchDetail/" + batchNo + "/");
        console.log(resp);
        return resp;
    },


    //List of users 
    AllUsers() {
        console.log("Gettting AllUsers");
        const resp = http.get(Endpoint + "AllUsers/");
        console.log(resp);
        return resp;
      },
    
    
    //   {
    //     "batchNo": "string",
    //     "sampleStage": "string",
    //     "sampledBy": "string",
    //     "sampleQuantity": "string",
    //     "sampleUnity": "string"
    //   }

    // Post Button
    ProductSample(obj) {

        console.log("Posting ProductSample")
        const resp = http.post(Endpoint + "ProductSample/", obj);
        console.log(resp);
        return resp;
    
    },
  },

};
