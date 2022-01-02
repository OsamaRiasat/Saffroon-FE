import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "QualityAssurance/";   // Its products intentially
const Endpoint = apiUrl + data;

export function GRNOList() {
  const resp = http.get(Endpoint + "PMGRNOList/");
  return resp;
}

export function RecievingDetailByGRNo(GRNo) {
  const resp = http.get(Endpoint + "PMRecievingDetailByGRNo/" + GRNo + "/");
  return resp;
}

export function Sample(obj) {
  const resp = http.post(Endpoint + "PMSample/", obj);
  return resp;
}