import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "Production/";
const Endpoint = apiUrl + data;

export default {
  methods: {

  


      // List of Plan Numbers
    PlanNo() {
        console.log("Gettting PlanNo");
        const resp = http.get(Endpoint + "PlanNo/");
        console.log(resp);
        return resp;
      },
  
    //when .plqnNo is selected this will be called annd this will return list of  PCodes
    ProductByPlanNo(planNo) {
        console.log("Gettting ProductByPlanNo");
        const resp = http.get(Endpoint + "ProductByPlanNo/" + planNo + "/");
        console.log(resp);
        return resp;
      },
  
      //when PCode is selected this will be called annd this will return 
      // dosage Form, list of PackSizes, list of batch numbers
    WhenProductIsSelected(PCode) {
        console.log("Gettting WhenProductIsSelected");
        const resp = http.get(Endpoint + "WhenProductIsSelected/" + PCode + "/");
        console.log(resp);
        return resp;
      },



    //   {
    //     "batchNo": "string",
    //     "packSize": "string",
    //     "noOfPacks": 0,
    //     "isRepack": true
    //   }

    PackingLog(obj) {

        console.log("posting PackingLog")
        const resp = http.post(Endpoint + "PackingLog/", obj);
        console.log(resp);
        return resp;
    },
    

  },

};
