import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "Production/";   // Its production intentially
const Endpoint = apiUrl + data;

export default {
  methods: {

    //List of PlanNo's
    PlanNoBIR() {
      console.log("Gettting PlanNo");
      const resp = http.get(Endpoint + "PlanNoBIR/");
      console.log(resp);
      return resp;
    },


    // When Plan No is selected
    PCodeBIR(planNo) {
      console.log("Gettting PCodeBIR");
      const resp = http.get(Endpoint + "PCodeBIR/" + planNo + "/");
      console.log(resp);
      return resp;
    },

    
    
    //obj
    // {
    //     "planNo": 0,
    //     "ProductCode": "string"
    // }

    // When Product Code is selected 
    IssueBatchNo(obj) {
      console.log("Gettting Standard Batc Size");
      const resp = http.post(Endpoint + "IssueBatchNo/", obj);
      console.log(resp);
      return resp;
    },


    // {
    //     "Pcode": "string",
    //     "batchSize": 0
    //  }

    // View Formulation Button
    Formulation(obj) {
        console.log("Viewing Formulation");
        const resp = http.post(Endpoint + "Formulation/", obj);
        console.log(resp);
        return resp;
      },

      


    //   {
    //     "batchNo": "string",
    //     "planNo": 0,
    //     "ProductCode": "string",
    //     "batchSize": 0,
    //     "MFGDate": "2021-08-31",
    //     "EXPDate": "2021-08-31"
    //   }

    // Post Button
    BPRLog(obj) {

        console.log("Posting BatchIssuenceRequest")
        const resp = http.post(Endpoint + "BPRLog/", obj);
        console.log(resp);
        return resp;
    
    },
  },

};
