import http from "../http/httpService.js";
import { apiUrl } from "../../config.js";

const data = "Production/";
const Endpoint = apiUrl + data;

export function PlanItems() {
  console.log("Gettting PlanItems");
  const resp = http.get(Endpoint + "PlanItems/");
  console.log(resp);
  return resp;
}

export function PlanStatus(obj) {
  console.log("putting PlanStatus")
  const resp = http.put(Endpoint + "PlanStatus/", obj);
  console.log(resp);
  return resp;
}
