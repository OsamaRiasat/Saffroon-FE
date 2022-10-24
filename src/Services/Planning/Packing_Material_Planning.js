import http from "../http/httpService.js"
import { apiUrl } from "../../config.js"


const data = "planning/"
const Endpoint = apiUrl + data

export function PlanNo_List_for_Planning() {

    const resp = http.get(Endpoint + "PlanNo_List_for_Planning");
    console.log(resp);
    return resp;

}

// When Plan No is selected
export function WhenPlanNoIsSelected(planNo) {

    const resp = http.get(Endpoint + "BackToProductSelection/" + planNo + "/");
    console.log(resp);
    return resp;

}

// When The Calculate Material is pressed
export function PlanPackingMaterialCalculation(planNo, isQuarantine, isPIP) {

    const resp = http.get(Endpoint + "PlanPackingMaterialCalculation/" + planNo + "/" + isQuarantine + "/" + isPIP + "/");
    console.log(resp);
    return resp;

}

