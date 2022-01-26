import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.json" 

const data="QualityControl/"
const Endpoint=apiUrl+data 

export default{
    
 
    methods: {
        
        RMAnalysisQCNo() {

            console.log("Gettting RMAnalysisQCNo")
            const resp = http.get(Endpoint + "Label_Print_ProductAnalysisQCNo/");
            console.log(resp);
            return resp;
        
        },
        
        RMAnalysis(QCNo) {

            console.log("RM Analysis:", QCNo)
            
            const resp = http.get(Endpoint + "Print_ProductAnalysis/"+QCNo+"/");
            console.log(resp);
            return resp;
        
        },

        
        
    }   

}
