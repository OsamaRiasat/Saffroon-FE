import http from "../../http/httpService.js";
import { apiUrl } from "../../../config.json";

const data = "QualityControl/";
const Endpoint = apiUrl + data;

export default {
  methods: {
    AllAnalyst() {
      const resp = http
        .get(Endpoint + "AllAnalyst/")
        .then((response) => {
          console.log(response);
          return response;
        })
        .catch((error) => {
          console.log("error");
        });
        return resp;
    },
    BlockAnalyst(id)
    {
        const resp = http
        .get(Endpoint + "BlockUnBlockAnalyst/"+id)
        .then((response) => {
          console.log(response);
          return response;
        })
        .catch((error) => {
          console.log("error");
        });
        return resp;
       
    }
  },
};
