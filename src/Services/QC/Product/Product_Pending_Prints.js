import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.json" 

const data="QualityControl/"
const Endpoint=apiUrl+data 

export default{
    
 
    methods: {
        
        RMAnalysisQCNo() {

            console.log("Gettting RMAnalysisQCNo")
            const resp = http.get(Endpoint + "Print_ProductAnalysisQCNo/");
            console.log(resp);
            return resp;
        
        },
        
        RMAnalysis(QCNo) {

            console.log("Gettting RMAnalysis")
            const resp = http.get(Endpoint + "Print_ProductAnalysis/"+QCNo+"/");
            console.log(resp);
            return resp;
        
        },

        
        RMAnalysisLogPrint(QCNo) {

            console.log("Gettting PostRMCOAApprovalView")
            const resp = http.get(Endpoint + "ProductAnalysisLogPrint/"+QCNo+"/");  
            console.log(resp);
            return resp;
        
        },
        
    }   

}
