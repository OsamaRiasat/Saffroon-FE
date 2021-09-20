import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "Production/";
const Endpoint = apiUrl + data;

export default {
  methods: {

    // List of PCodes
    PCodeBPR() {
      console.log("Gettting PCodeBPR");
      const resp = http.get(Endpoint + "PCodeBPR/");
      console.log(resp);
      return resp;
    },

    //when PCode is selected this will be called annd this will return list of Batch Numbers and list to be append in the table
    BatchNoandBatchesList(PCode) {
      console.log("Getting BPRByPcodeView");
      const resp = http.get(Endpoint + "BPRByPcodeView/" + PCode + "/");
      console.log(resp);
      return resp;
    },

    

    // {
    //     "ProductCode": "string",
    //     "batchNo": "string"
    //   }
    
    // when Pcode is selected this will be called and it will return data for general section, 
    // First List to be added in the table
    // second list for stages list
    GeneralDataBPRLog(obj) {

        console.log("getting GeneralDataBPRLog")
        const resp = http.post(Endpoint + "GeneralDataBPRLog/", obj);
        console.log(resp);
        return resp;
    },
    

    // List of object to be append in the Data Table against Product Code
    DataFromBPR(PCode) {
        console.log("Gettting DataFromBPR");
        const resp = http.get(Endpoint + "DataFromBPR/" + PCode + "/");
        console.log(resp);
        return resp;
      },

  
    //   {
    //     "batchNo": "string",
    //     "openingDate": "2021-08-31",
    //     "closingDate": "2021-08-31",
    //     "currentStage": "string",
    //     "units": "string",
    //     "theoreticalYield": 0,
    //     "actualYield": 0,
    //     "yieldPercentage": 0,
    //     "PartialStatus": "string",
    //     "remarks": "string"
    //   }


    // Call this when all the fields are filled by post buttom
      BatchStages(obj) {

        console.log("Posting BatchIssuenceRequest")
        const resp = http.post(Endpoint + "BatchStages/", obj);
        console.log(resp);
        return resp;
    
    },
  },

};
