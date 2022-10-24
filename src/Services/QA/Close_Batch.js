import http from "../http/httpService.js";
import { apiUrl } from "../../config.js";

const data = "QualityAssurance/";   // Its production intentially
const Endpoint = apiUrl + data;

export function OpenBatches() {
	console.log("Getting OpenBatches");
	const resp = http.get(Endpoint + "OpenBatches/");
	console.log(resp);
	return resp;
}

export function CloseBPR(batchNo,obj) {
	console.log("Putting CloseBPR");
	const resp = http.put(Endpoint + "CloseBPR/"+batchNo+"/", obj);
	console.log(resp);
	return resp;
}
