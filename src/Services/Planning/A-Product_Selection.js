import http from "../http/httpService.js"
import { apiUrl } from "../../config.json"


const data = "planning/"
const Endpoint = apiUrl + data

export function highestPlanNo() {

    const resp = http.get(Endpoint + "highestPlanNo/");
    console.log(resp);
    return resp;

}

export function ProductCodes() {
    console.log("Gettting ProductCodes")
    const resp = http.get(Endpoint + "viewset/ProductCodes/");
    console.log(resp);
    return resp;
}

export function ProductNames() {

    console.log("Gettting ProductNames")
    const resp = http.get(Endpoint + "viewset/ProductNames/");
    console.log(resp);
    return resp;

}
export function ProductDetailsByCode(ProductCode) {

    console.log("Gettting ProductDetailsByCode")
    const resp = http.get(Endpoint + "ProductDetailsByCode/" + ProductCode + "/");
    console.log(resp);
    return resp;

}

export function ProductDetailsByName(Product) {

    console.log("Gettting ProductDetailsByName")
    const resp = http.get(Endpoint + "ProductDetailsByName/" + Product + "/");
    console.log(resp);
    return resp;

}
export function GoodsStockDetails(ProductCode, PackSize, Packs, isFGS, isWIP) {

    console.log("Gettting GoodsStockDetails")
    const resp = http.get(Endpoint + "GoodsStockDetails/" + ProductCode + "/" + PackSize + "/" + Packs + "/" + isFGS + "/" + isWIP + "/");
    console.log(resp);
    return resp;

}
export function PostPlan(data) {

    console.log("Posting Plan")
    const resp = http.post(Endpoint + "PostPlan/", data);
    console.log(resp);
    return resp;

}

// RM Back to production plan

export function BackToProductSelection(planNo) {

    const resp = http.get(Endpoint + "BackToProductSelection/" + planNo + "/");
    console.log(resp);
    return resp;

}

// RM Purchase Order



