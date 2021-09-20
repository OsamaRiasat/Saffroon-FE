import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.json" 

const data="QualityControl/"
const Endpoint=apiUrl+data 

export default{
    
 
    methods: {
        
        RMAnalysisQCNo() {

            console.log("Gettting RMAnalysisQCNo")
            const resp = http.get(Endpoint + "RMAnalysisQCNo/");
            console.log(resp);
            return resp;
        
        },
        
        RMAnalysis(QCNo) {

            console.log("Gettting RMAnalysis")
            const resp = http.get(Endpoint + "RMAnalysis/"+QCNo+"/");
            console.log(resp);
            return resp;
        
        },

        
        PostRMCOAApproval(QCNo,obj) {

            console.log("Gettting PostRMCOAApprovalView")
            const resp = http.post(Endpoint + "PostRMCOAApproval/"+QCNo+"/", obj);  
            console.log(resp);
            return resp;
        
        },
        
    }   

}
