import http from "../http/httpService.js"
import {apiUrl} from "../../config.json" 


const data="inventory/"
const Endpoint=apiUrl+data 


// RM Demand Form
export function getRMDemandHighestDNo()
{
    console.log("Gettting RMDemandProducts")
     const resp=http.get(Endpoint+"RMDemandHighestDNo/");
     console.log(resp);
     return resp;
     
}

export function RawMaterialNames()
{
    console.log("Gettting RawMaterialNames")
     const resp=http.get(Endpoint+"viewset/RawMaterialNames/");
     console.log(resp);
     return resp;
    
}

export function RawMaterialCodes()
{
    console.log("Gettting RawMaterialCodes")
     const resp=http.get(Endpoint+"viewset/RawMaterialCodes/");
     console.log(resp);
     return resp;
    
}

export function RawMaterialSearchByRMCode(rmCode)
{
    
    console.log("Gettting RawMaterialbyCode")
     const resp=http.get(Endpoint+"RawMaterialSearchByRMCode/"+rmCode+"/");
     console.log(resp);
     return resp;
    
}
export function RawMaterialSearchByName(rmName)
{
    
    console.log("Gettting RawMaterialSearchByName")
     const resp=http.get(Endpoint+"RawMaterialSearchByName/"+rmName+"/");
     console.log(resp);
     return resp;
    
}

export function PlanNosList()
{
     console.log("Gettting PlanNosList")
     const resp=http.get(Endpoint+"PlanNosList");
     console.log(resp);
     return resp;
    
}

export function Demanded_Materials_Through_PlanNo(planNo)
{    
    console.log("Gettting Demanded_Materials_Through_PlanNo")
     const resp=http.get(Endpoint+"Demanded_Materials_Through_PlanNo"+planNo);
     console.log(resp);
     return resp;
    
}

export function RMDemands(rmdemand)
{
    
    console.log("Gettting RMDemands")
     const resp=http.post(Endpoint+"RMDemands/",rmdemand);
     console.log(resp);
     return resp;
    
}

// RM Purchase Order



