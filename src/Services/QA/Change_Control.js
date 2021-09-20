import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "QualityAssurance/";   // Its production intentially
const Endpoint = apiUrl + data;

export default {
  methods: {
    

   

    // Show HighestCCNo + 1 on the form
    HighestCCNo() {
        console.log("Getting HighestCCNo");
        const resp = http.get(Endpoint + "HighestCCNo/");
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
      
    
    //   {
    //     "status": "CLOSE",   // every time
    //     "initiator": "string",
    //     "department": "string",
    //     "natureOfChange": "string",
    //     "keyword": "string",
    //     "category": "string",
    //     "QAStatus": "string",
    //     "name": "string",
    //     "relatedChanges": "string",
    //     "descriptionOfChange": "string",
    //     "intendedPurposeOfChange": "string",
    //     "commentsOfProductionManager": "string",
    //     "commentsOfQCManager": "string",
    //     "commentsOfPlantDirector": "string",
    //     "commentsOfQAManager": "string",
    //     "batchNo": "string"
    //   }

    // Post Button
    ChangeControl(obj) {

        console.log("Posting NCR")
        const resp = http.post(Endpoint + "ChangeControl/", obj);
        console.log(resp);
        return resp;
    
    },



    // list for print
    NCRNoList() {
        console.log("Getting NCRNoList");
        const resp = http.get(Endpoint + "NCRNoList/");
        console.log(resp);
        return resp;
      },

      NCRDetail(NCRNo) {
        console.log("Getting NCRDetail");
        const resp = http.get(Endpoint + "NCRDetail/"+NCRNo+"/");
        console.log(resp);
        return resp;
      },
  },

};
