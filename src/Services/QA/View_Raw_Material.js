import http from "../http/httpService.js"
import {apiUrl} from "../../config.js"

const data="QualityAssurance/"
const Endpoint=apiUrl+data

export default{


    methods: {

        RMDetail(RMCode="",MaterialName="", Units="", Type="") {
            console.log("Gettting Raw Materials")
            console.log(RMCode,MaterialName, Units, Type)
            const resp = http.get(Endpoint+ "RawMaterialDetail/?RMCode="+RMCode+"&"+"&Material=" +MaterialName+"&"+"&Units=" +Units+"&"+"&Type=" +Type);
            // const resp = http.get(Endpoint+ "RMDataAnalysis?RMAnalysisID__QCNo__IGPNo__RMCode__Material="+MaterialName+"&"+"RMAnalysisID__QCNo__IGPNo__batchNo=" +batchNo+"&"+"RMAnalysisID__QCNo__QCNo=" +QCNo+"&"+"parameter=" +parameter+"&"+"RMAnalysisID__QCNo__IGPNo__S_ID__S_Name=" +SuplierName);
            console.log(resp);
            return resp;
        },
    }
}
