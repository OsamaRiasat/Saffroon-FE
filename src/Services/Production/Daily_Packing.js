import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "Production/";
const Endpoint = apiUrl + data;

export function PlanNo() {
  console.log("Gettting PlanNo");
  const resp = http.get(Endpoint + "PlanNo/");
  console.log(resp);
  return resp;
}
 
export function ProductByPlanNo(planNo) {
  console.log("Gettting ProductByPlanNo");
  const resp = http.get(Endpoint + "ProductByPlanNo/" + planNo + "/");
  console.log(resp);
  return resp;
}

export function WhenProductIsSelected(PCode) {
  console.log("Gettting WhenProductIsSelected");
  const resp = http.get(Endpoint + "WhenProductIsSelected/" + PCode + "/");
  console.log(resp);
  return resp;
}

export function PackingLog(obj) {
  console.log("posting PackingLog")
  const resp = http.post(Endpoint + "PackingLog/", obj);
  console.log(resp);
  return resp;
}