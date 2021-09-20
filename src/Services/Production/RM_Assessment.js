import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "Production/";
const Endpoint = apiUrl + data;

export default {
  methods: {

  


      // List of Pcodes
      ListOfPCodeForAssessment() {
        console.log("Gettting ListOfPCodeForAssessment");
        const resp = http.get(Endpoint + "ListOfPCodeForAssessment/");
        console.log(resp);
        return resp;
      },

      // List of PNames
      ListOfPNameForAssessment() {
        console.log("Gettting ListOfPNameForAssessment");
        const resp = http.get(Endpoint + "ListOfPNameForAssessment/");
        console.log(resp);
        return resp;
      },
      
      
    // If Name is selected than call this
      PCodeByPNameAssessment(pName) {
        console.log("Gettting PCodeByPNameAssessment");
        const resp = http.get(Endpoint + "PCodeByPNameAssessment/" + pName + "/");
        console.log(resp);
        return resp;
      },

      // when .pcode is selected this will be called and this will return list of  packsize and a batch size and a product  name
      PackSizesList(PCode) {
        console.log("Gettting PackSizesList");
        const resp = http.get(Endpoint + "PackSizesList/" + PCode + "/");
        console.log(resp);
        return resp;
      },
      
      
      //when PCode is selected this will be called annd this will return 
      // current stage data, list of previous stages history
      ViewFormulationForAssessment(PCode, batchSize, noOfBatches) {
        console.log("Gettting ViewFormulationForAssessment");
        const resp = http.get(Endpoint + "ViewFormulationForAssessment/" + PCode + "/"+ batchSize + "/"+ noOfBatches + "/");
        console.log(resp);
        return resp;
      },




  },

};
