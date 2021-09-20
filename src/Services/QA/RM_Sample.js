import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "QualityAssurance/";   // Its products intentially
const Endpoint = apiUrl + data;

export default {
  methods: {

    //List of GRNO's with with status "QUARANTINED"
    GRNOList() {
      console.log("Gettting GRNOList");
      const resp = http.get(Endpoint + "GRNOList/");
      console.log(resp);
      return resp;
    },

    // When GRNo is selected
    RecievingDetailByGRNo(GRNo) {
        console.log("Gettting RMRecievingDetailByGRNo");
        const resp = http.get(Endpoint + "RMRecievingDetailByGRNo/" + GRNo + "/");
        console.log(resp);
        return resp;
    },
    
 
    // {
    //     "QCNo": "string",
    //     "GRNo": 0,
    //     "deliveredBy": "string",
    //     "receivedBy": "string"
    //   }

    // Post Button
    Sample(obj) {

        console.log("Posting RMSample")
        const resp = http.post(Endpoint + "RMSample/", obj);
        console.log(resp);
        return resp;
    
    },
  },

};
