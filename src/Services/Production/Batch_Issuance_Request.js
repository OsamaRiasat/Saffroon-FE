import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "Production/";
const Endpoint = apiUrl + data;

export default {
  methods: {
    PlanNo() {
      console.log("Gettting PlanNo");
      const resp = http.get(Endpoint + "PlanNo/");
      console.log(resp);
      return resp;
    },

    
    ProductByPlanNo(planNo) {
      console.log("Gettting ProductByPlanNo");
      const resp = http.get(Endpoint + "ProductByPlanNo/" + planNo + "/");
      console.log(resp);
      return resp;
    },

    // Standard batch Size
    SBS(PCode) {
      console.log("Gettting Standard Batc Size");
      const resp = http.get(Endpoint + "SBS/"+PCode+"/");
      console.log(resp);
      return resp;
    },

    BatchIssuenceRequest(obj) {

        console.log("Posting BatchIssuenceRequest")
        const resp = http.post(Endpoint + "BatchIssuenceRequest/", obj);
        console.log(resp);
        return resp;
    
    },
  },

};
