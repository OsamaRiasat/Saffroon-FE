import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "QualityAssurance/";   // Its production intentially
const Endpoint = apiUrl + data;

export default {
  methods: {

    // List of Dosage Forms
    ListOfDosageForms() {
        console.log("Getting ListOfDosageForms");
        const resp = http.get(Endpoint + "ListOfDosageForms/");
        console.log(resp);
        return resp;
      },
    //     "ProductCode": "string",
    //     "Product": "string",
    //     "RegistrationNo": "string",
    //     "RegistrationDate": "2021-09-05",
    //     "RenewalDate": "2021-09-05", // + 5 years in registration date
    //     "GenericName": "string",
    //     "Composition": "string",
    //     "ShelfLife": "string",
    //     "dosageForm": "string"
    //   }
    // Post Button
    AddProduct(obj) {

        console.log("Adding product")
        const resp = http.post(Endpoint + "AddProduct/", obj);
        console.log(resp);
        return resp;
   
    },


  },

};