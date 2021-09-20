import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.json" 

const data="QualityControl/"
const Endpoint=apiUrl+data 

export default{
    
 
    methods: {
        
        RMAnalysisQCNo() {

            console.log("Gettting PMAnalysisQCNo")
            const resp = http.get(Endpoint + "PMAnalysisQCNo/");
            console.log(resp);
            return resp;
        
        },
        
        RMAnalysis(QCNo) {

            console.log("Gettting PMAnalysis")
            const resp = http.get(Endpoint + "PMAnalysis/"+QCNo+"/");
            console.log(resp);
            return resp;
        
        },

        
        PostRMCOAApproval(QCNo,obj) {

            console.log("Gettting PostRMCOAApprovalView")
            const resp = http.post(Endpoint + "PostPMCOAApproval/"+QCNo+"/", obj);  
            console.log(resp);
            return resp;
        
        },
        
    }   

}
