import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.json" 

const data="QualityControl/"
const Endpoint=apiUrl+data 

export default{
    
 
    methods: {
        
        RMDataAnalysis(MaterialName="", batchNo="", QCNo="", parameter="", SuplierName="") {

            console.log("Gettting RMDataAnalysis")
            const resp = http.get(Endpoint+ "RMDataAnalysis?RMAnalysisID__QCNo__IGPNo__RMCode__Material"+MaterialName+"&"+"RMAnalysisID__QCNo__IGPNo__batchNo=" +batchNo+"&"+"RMAnalysisID__QCNo__QCNo=" +QCNo+"&"+"parameter=" +parameter+"&"+"RMAnalysisID__QCNo__IGPNo__S_ID__S_Name=" +SuplierName);
            console.log(resp);
            return resp;
    

        },
        
        
    }   

}
