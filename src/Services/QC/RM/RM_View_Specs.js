import http from "../../http/httpService.js";
import { apiUrl } from "../../../config.js";

const data = "QualityControl/";
const Endpoint = apiUrl + data;

export default {
  methods: {
    CodeListOfSpecifications() {
      console.log("Gettting CodeListOfSpecifications");
      const resp = http.get(Endpoint + "RMCodeListOfSpecifications/");
      console.log(resp);
      return resp;
    },

    MaterialListOfSpecifications() {
      console.log("Gettting MaterialListOfSpecifications");
      const resp = http.get(Endpoint + "RMMaterialListOfSpecifications/");
      console.log(resp);
      return resp;
    },

    ViewSpecifications(code) {
      console.log("Gettting RMViewSpecifications");
      const resp = http.get(Endpoint + "RMViewSpecifications/" + code + "/");
      console.log(resp);
      return resp;
    },
    CodeByName(name) {

      console.log("Gettting CodeByRMName/")
      const resp = http.get(Endpoint + "RMCodeByRMNameForViewSpecs/"+name+"/");
      console.log(resp);
      return resp;

  },
  NameByCode(code) {

      console.log("Gettting NameByCode/")
      const resp = http.get(Endpoint + "RMNameByRMCodeForViewSpecs/"+code+"/");
      console.log(resp);
      return resp;

  },
  },

};
