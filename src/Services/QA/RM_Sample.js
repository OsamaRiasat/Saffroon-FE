import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "QualityAssurance/";   // Its products intentially
const Endpoint = apiUrl + data;

export function GRNOList() {
  const resp = http.get(Endpoint + "GRNOList/");
  return resp;
}

export function RecievingDetailByGRNo(GRNo) {
  const resp = http.get(Endpoint + "RMRecievingDetailByGRNo/" + GRNo + "/");
  return resp;
}

export function Sample(obj) {
  const resp = http.post(Endpoint + "RMSample/", obj);
  return resp;
}