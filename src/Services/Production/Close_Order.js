import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "Production/";
const Endpoint = apiUrl + data;

export default {
  methods: {

  


      // List of Pcodes
      PlanItems() {
        console.log("Gettting PlanItems");
        const resp = http.get(Endpoint + "PlanItems/");
        console.log(resp);
        return resp;
      },


    //   {
    //     "planNo": 5,
    //     "ProductCode": "BS",
    //     "PackSize": "1x10",
    //     "status": "CLOSED" //CANCELLED
    //   }
      PlanStatus(obj) {

        console.log("putting PlanStatus")
        const resp = http.put(Endpoint + "PlanStatus/", obj);
        console.log(resp);
        return resp;
    },



  },

};
