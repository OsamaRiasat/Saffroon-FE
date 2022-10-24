import http from "../../http/httpService.js";
import { apiUrl } from "../../../config.js";

const data = "QualityControl/";
const Endpoint = apiUrl + data;

export default {
  methods: {
    CodeListOfSpecifications() {
      console.log("Gettting CodeListOfSpecifications");
      const resp = http.get(Endpoint + "ProductCodeListOfSpecifications/");
      console.log(resp);
      return resp;
    },

    MaterialListOfSpecifications() {
      console.log("Gettting MaterialListOfSpecifications");
      const resp = http.get(Endpoint + "ProductListOfSpecifications/");
      console.log(resp);
      return resp;
    },


    ProductStageListOfSpecifications(code) {
      console.log("Gettting ProductStageListOfSpecifications");
      const resp = http.get(Endpoint + "ProductStageListOfSpecifications/" + code + "/");
      console.log(resp);
      return resp;
    },

    ViewSpecifications(code,stage) {
      console.log("Gettting ProductViewSpecifications");
      const resp = http.get(Endpoint + "ProductViewSpecifications/" + code + "/"+ stage + "/");
      console.log(resp);
      return resp;
    },

    CodeByName(name) {

      console.log("Gettting CodeByRMName/")
      const resp = http.get(Endpoint + "ProductCodeByProductNameForViewSpecs/"+name+"/");
      console.log(resp);
      return resp;

  },
  NameByCode(code) {

      console.log("Gettting NameByCode/")
      const resp = http.get(Endpoint + "ProductNameByProductCodeForViewSpecs/"+code+"/");
      console.log(resp);
      return resp;

  },
  },

};
