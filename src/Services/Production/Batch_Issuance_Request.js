import http from "../http/httpService.js";
import { apiUrl } from "../../config.js";

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

export function SBS(PCode) {
  console.log("Gettting Standard Batc Size");
  const resp = http.get(Endpoint + "SBS/"+PCode+"/");
  console.log(resp);
  return resp;
}

export function Required_batches_by_product_and_planNo(PlanNo,PCode) {
  console.log("Gettting Required_batches_by_product_and_planNo");
  const resp = http.get(Endpoint + "Required_batches_by_product_and_planNo"+"/"+PlanNo+"/"+PCode);
  console.log(resp);
  return resp;
}

export function BatchIssuenceRequest(obj) {
  console.log("Posting BatchIssuenceRequest")
  const resp = http.post(Endpoint + "BatchIssuenceRequest/", obj);
  console.log(resp);
  return resp;
}
