import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "products/";   // Its products intentially
const Endpoint = apiUrl + data;

export default {
  methods: {

    //List of PCodes those  have formulations
    PCodeList() {
      console.log("Gettting PCodeList");
      const resp = http.get(Endpoint + "FPCodeList/");
      console.log(resp);
      return resp;
    },


    PNameList() {
      console.log("Gettting PNameList");
      const resp = http.get(Endpoint + "FPNameList/" );
      console.log(resp);
      return resp;
    },


    PCodeByPname(PName) {
        console.log("Gettting PNameList");
        const resp = http.get(Endpoint + "PCodeByPname/" + PName + "/");
        console.log(resp);
        return resp;
      },
  
      PnameByPCode(PCode) {
        console.log("Gettting PNameList");
        const resp = http.get(Endpoint + "PnameByPCode/" + PCode + "/");
        console.log(resp);
        return resp;
      },
      
      // Product Code is selected this will give its previous formulation
      ProductFormulation(PCode) {
        console.log("Gettting PNameList");
        const resp = http.get(Endpoint + "ProductFormulation/" + PCode + "/");
        console.log(resp);
        return resp;
      },
    

    RMCodeList() {
      console.log("Gettting RMCodeList");
      const resp = http.get(Endpoint + "RMCodeList/");
      console.log(resp);
      return resp;
    },
    RMNameList() {
        console.log("Gettting RMNameList");
        const resp = http.get(Endpoint + "RMNameList/");
        console.log(resp);
        return resp;
      },
      RMCodeByName(Name) {
        console.log("Gettting RMCodeByName");
        const resp = http.get(Endpoint + "RMCodeByName/" + Name + "/");
        console.log(resp);
        return resp;
      },
  
      RMNameByRMCode(code) {
        console.log("Gettting RMNameByRMCode");
        const resp = http.get(Endpoint + "RMNameByRMCode/" + code + "/");
        console.log(resp);
        return resp;
      },
  

    
    // when rmcode is selected
    RMData(RMCode) {
        console.log("Viewing RMData");
        const resp = http.get(Endpoint + "RMData/" + RMCode + "/" );
        console.log(resp);
        return resp;
      },

      
    //   {
    //     "fItems": [
    //       {
    //         "ProductCode": "string",
    //         "RMCode": "string",
    //         "batchSize": 0,
    //         "quantity": "string",
    //         "date": "2021-09-02",
    //         "docNo": "string"
    //       }
    //     ]
    //   }

    // Post Button
    RMFormulation(obj) {

        console.log("Posting RMFormulation")
        const resp = http.post(Endpoint + "RMFormulation/", obj);
        console.log(resp);
        return resp;
    
    },
  },

};
