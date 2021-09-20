import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "Production/";
const Endpoint = apiUrl + data;

export default {
  methods: {

  


      // List of Pcodes
      PCodesForLineClearance() {
        console.log("Gettting PCodesForLineClearance");
        const resp = http.get(Endpoint + "PCodesForLineClearance/");
        console.log(resp);
        return resp;
      },
  
    // when .pcode is selected this will be called and this will return list of  BatchNumbers
    BatchNoBYPCode(pcode) {
        console.log("Gettting BatchNoBYPCode");
        const resp = http.get(Endpoint + "BatchNoBYPCode/" + pcode + "/");
        console.log(resp);
        return resp;
      },
  
      //when PCode is selected this will be called annd this will return 
      // current stage data, list of previous stages history
      WhenBatchNoIsSelected(batchNo) {
        console.log("Gettting WhenBatchNoIsSelected");
        const resp = http.get(Endpoint + "WhenBatchNoIsSelected/" + batchNo + "/");
        console.log(resp);
        return resp;
      },




  },

};
