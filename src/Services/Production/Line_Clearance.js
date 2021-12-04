import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "Production/";
const Endpoint = apiUrl + data;

export function PCodesForLineClearance() {
  console.log("Gettting PCodesForLineClearance");
  const resp = http.get(Endpoint + "PCodesForLineClearance/");
  console.log(resp);
  return resp;
}

export function BatchNoBYPCode(pcode) {
  console.log("Gettting BatchNoBYPCode");
  const resp = http.get(Endpoint + "BatchNoBYPCode/" + pcode + "/");
  console.log(resp);
  return resp;
}

export function WhenBatchNoIsSelected(batchNo) {
  console.log("Gettting WhenBatchNoIsSelected");
  const resp = http.get(Endpoint + "WhenBatchNoIsSelected/" + batchNo + "/");
  console.log(resp);
  return resp;
}