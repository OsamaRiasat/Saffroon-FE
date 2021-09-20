import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "QualityAssurance/";   // Its production intentially
const Endpoint = apiUrl + data;

export default {
  methods: {


    // List of Dosage Forms
    //   {
    //     "RMCode": "string",
    //     "Material": "string",
    //     "Units": "string",
    //     "Type": "string"
    //   }
    // Post Button
    AddRawMaterial(obj) {

        console.log("Adding AddRawMaterial")
        const resp = http.post(Endpoint + "AddRawMaterial/", obj);
        console.log(resp);
        return resp;
    
    },


  },

};
