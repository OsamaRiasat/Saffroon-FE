import http from "../http/httpService.js";
import { apiUrl } from "../../config.js";

const data = "inventory/";
const Endpoint = apiUrl + data;

export function PCodeBPR() {
  console.log("Gettting PCodeBPR");
  const resp = http.get(Endpoint + "PCodeBPR/");
  console.log(resp);
  return resp;
}

export function BatchNoandBatchesList(PCode) {
  console.log("Getting BPRByPcodeView");
  const resp = http.get(Endpoint + "BPRByPcodeView/" + PCode + "/");
  console.log(resp);
  return resp;
}

export function GeneralDataBPRLog(obj) {
  console.log("getting GeneralDataBPRLog");
  const resp = http.post(Endpoint + "GeneralDataBPRLog/", obj);
  console.log(resp);
  return resp;
}

export function DataFromBPR(PCode) {
  console.log("Gettting DataFromBPR");
  const resp = http.get(Endpoint + "DataFromBPR/" + PCode + "/");
  console.log(resp);
  return resp;
}

export function BatchStages(obj) {
  console.log("Posting BatchIssuenceRequest");
  const resp = http.post(Endpoint + "BatchStages/", obj);
  console.log(resp);
  return resp;
}

export function getProductName(PCode) {
  console.log("Gettting PnameByPCode");
  const resp = http.get(apiUrl+"Production/" + "PnameByPCode/" + PCode + "/");
  console.log(resp);
  return resp;
}
