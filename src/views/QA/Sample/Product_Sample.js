import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "QualityAssurance/";   // Its products intentially
const Endpoint = apiUrl + data;

export default {
  methods: {
    PSPCode() {
      console.log("Gettting PSPCode");
      const resp = http.get(Endpoint + "PSPCode/");
      console.log(resp);
      return resp;
    },
    
    PSBatchNo(Pcode) {
        console.log("Gettting PSBatchNo");
        const resp = http.get(Endpoint + "PSBatchNo/" + Pcode + "/");
        console.log(resp);
        return resp;
    },

    PSBatchDetail(batchNo) {
        console.log("Gettting PSBatchDetail");
        const resp = http.get(Endpoint + "PSBatchDetail/" + batchNo + "/");
        console.log(resp);
        return resp;
    },

    AllUsers() {
        console.log("Gettting AllUsers");
        const resp = http.get(Endpoint + "AllUsers/");
        console.log(resp);
        return resp;
    },
    
    ProductSample(obj) {

        console.log("Posting ProductSample")
        const resp = http.post(Endpoint + "ProductSample/", obj);
        console.log(resp);
        return resp;
    
    },
  },

};
