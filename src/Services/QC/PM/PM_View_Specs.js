import http from "../../http/httpService.js";
import { apiUrl } from "../../../config.js";

const data = "QualityControl/";
const Endpoint = apiUrl + data;

export default {
  methods: {
    CodeListOfSpecifications() {
      console.log("Gettting CodeListOfSpecifications");
      const resp = http.get(Endpoint + "PMCodeListOfSpecifications/");
      console.log(resp);
      return resp;
    },

    MaterialListOfSpecifications() {
      console.log("Gettting MaterialListOfSpecifications");
      const resp = http.get(Endpoint + "PMMaterialListOfSpecifications/");
      console.log(resp);
      return resp;
    },

    ViewSpecifications(code) {
      console.log("Gettting PMViewSpecifications");
      const resp = http.get(Endpoint + "PMViewSpecifications/" + code + "/");
      console.log(resp);
      return resp;
    },
    CodeByName(name) {

      console.log("Gettting CodeByRMName/")
      const resp = http.get(Endpoint + "PMCodeByPMNameForViewSpecs/"+name+"/");
      console.log(resp);
      return resp;

  },
  NameByCode(code) {

      console.log("Gettting NameByCode/")
      const resp = http.get(Endpoint + "PMNameByPMCodeForViewSpecs/"+code+"/");
      console.log(resp);
      return resp;

  },
  },

};
