import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "QualityAssurance/";   // Its production intentially
const Endpoint = apiUrl + data;

export default {
  methods: {
    

    // use this for list of verifiers and
    AllUsers() {
        console.log("Getting AllUsers");
        const resp = http.get(Endpoint + "AllUsers/");
        console.log(resp);
        return resp;
      },

    // Show HighestNCRNo + 1 on the form
    HighestNCR() {
        console.log("Getting HighestNCR");
        const resp = http.get(Endpoint + "HighestNCR/");
        console.log(resp);
        return resp;
      },
    
    CategoriesList() {
      console.log("Gettting CategoriesList");
      const resp = http.get(Endpoint + "CategoriesList/" );
      console.log(resp);
      return resp;
    },

    // When a particular category is selected call this api to show list of SubCategories
    SubCategories(category) {
      console.log("Gettting Standard Batc Size");
      const resp = http.get(Endpoint + "SubCategories/"+category+"/");
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
    //     "status": "string",              // send "OPEN" everytime
    //     "originator": "string",          
    //     "section": "string",             
    //     "sourceOfIdentification": "string",
    //     "refNo": "string",
    //     "natureOfNC": "string",
    //     "gradeOfNC": "string",
    //     "category": "string",
    //     "subCategory": "string",
    //     "descriptionOFNonConformance": "string",
    //     "solutionOfCurrentProblem": "string",
    //     "immediateAction": "string",         // text field next to "solutionOfCurrentProblem" 
    //     "isActionTaken": true,               // True for checked and vice versa
    //     "actionDate": "2021-09-03",          
    //     "closingDate": "2021-09-03",         // send Todays Date everytime
    //     "verifiedBy": "string",
    //     "isLimitAction": true,
    //     "rootCause": "string",
    //     "proposedCorrectiveAction": "string",
    //     "actionTaken": "string",
    //     "batchNo": "string"
    //   }

    // Post Button
    NCR(obj) {

        console.log("Posting NCR")
        const resp = http.post(Endpoint + "NCR/", obj);
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
