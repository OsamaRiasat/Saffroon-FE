import http from "../http/httpService.js";
import { apiUrl } from "../../config.js";

const data = "Production/";
const Endpoint = apiUrl + data;

export function ListOfPCodeForAssessment() {
  console.log("Gettting ListOfPCodeForAssessment");
  const resp = http.get(Endpoint + "ListOfPCodeForAssessment/");
  console.log(resp);
  return resp;
}

export function ListOfPNameForAssessment() {
  console.log("Gettting ListOfPNameForAssessment");
  const resp = http.get(Endpoint + "ListOfPNameForAssessment/");
  console.log(resp);
  return resp;
}

export function PCodeByPNameAssessment(pName) {
  console.log("Gettting PCodeByPNameAssessment");
  const resp = http.get(Endpoint + "PCodeByPNameAssessment/" + pName + "/");
  console.log(resp);
  return resp;
}

export function PackSizesList(PCode) {
  console.log("Gettting PackSizesList");
  const resp = http.get(Endpoint + "PackSizesList/" + PCode + "/");
  console.log(resp);
  return resp;
}

export function ViewFormulationForAssessment(PCode, batchSize, noOfBatches) {
  console.log("Gettting ViewFormulationForAssessment");
  const resp = http.get(Endpoint + "ViewFormulationForAssessment/" + PCode + "/"+ batchSize + "/"+ noOfBatches + "/");
  console.log(resp);
  return resp;
}
