import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "QualityAssurance/";   // Its production intentially
const Endpoint = apiUrl + data;

export function HighestCCNo() {
	console.log("Getting HighestCCNo");
	const resp = http.get(Endpoint + "HighestCCNo/");
	console.log(resp);
	return resp;
}

export function ProductCode() {
	console.log("Getting ProductCode");
	const resp = http.get(Endpoint + "ProductCode/");
	console.log(resp);
	return resp;
}

export function BatchNo(PCode) {
	console.log("GetttingBatchNo");
	const resp = http.get(Endpoint + "BatchNo/" + PCode + "/");
	console.log(resp);
	return resp;
}

export function Change_Control(obj) {
	console.log("Posting NCR");
	const resp = http.post(Endpoint + "ChangeControl/", obj);
	console.log(resp);
	return resp;
}

export function NCRNoList() {
	console.log("Getting NCRNoList");
	const resp = http.get(Endpoint + "NCRNoList/");
	console.log(resp);
	return resp;
}

export function NCRDetail(NCRNo) {
	console.log("Getting NCRDetail");
	const resp = http.get(Endpoint + "NCRDetail/" + NCRNo + "/");
	console.log(resp);
	return resp;
}

export function getChangeControlNoList() {
	const resp = http.get(Endpoint + "ChangeControlNumbersList/");
	return resp;
}

export function getChangeControlNoData(CCNo) {
	const resp = http.get(Endpoint + "ChangeControlGetData/" + CCNo);
	return resp;
}

export function getQualityAssuranceList() {
	const resp = http.get(Endpoint + "QAs");
	return resp;
}

export function saveVerificationChanges(data, CCNo) {
	const resp = http.put(Endpoint + "changeControlVerificationOfChanges/" + CCNo, data);
	return resp;
}

export function getHighestDRFNo() {
	const resp = http.get(Endpoint + "HighestDRFNo/");
	return resp;
}

export function postDRFView(data) {
	const resp = http.post(Endpoint + "DRFPostView/", data);
	return resp;
}