import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "products/";   // Its production intentially
const Endpoint = apiUrl + data;

export default {
  methods: {



    // [
    //   {
    //     "ProductCode": "string"
    //   }
    // ]
    // List of Dosage Forms
    ProductCodeListForPackSize() {
        console.log("Getting ProductCodeListForPackSize");
        const resp = http.get(Endpoint + "ProductCodeListForPackSize/");
        console.log(resp);
        return resp;
       },


    //  {
    //   "Product": "Dysmorin Tablet 50 mg",
    //   "DosageForm": "Tablet",
    //   "RegistrationNo": "88778"
    // }
    // When the product code is selected
    ProductData(obj) {

        console.log("getting ProductData")
        const resp = http.get(Endpoint + "ProductData/"+ obj+"/");
        console.log(resp);
        return resp;
    
    },


    // {
    //   "PackSize": "string",
    //   "PackType": "string",
    //   "MRP": 0,
    //   "FillingWeight": 0,
    //   "ProductCode": "string"
    // }
    // Post Button


    AddPackSize(obj) {

        console.log("Adding AddPackSize")
        const resp = http.post(Endpoint + "AddPackSize/", obj);
        console.log(resp);
        return resp;
    
    },


  },

};
