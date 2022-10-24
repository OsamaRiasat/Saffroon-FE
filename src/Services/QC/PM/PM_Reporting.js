import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.js"

const data="QualityControl/"
const Endpoint=apiUrl+data

export default{


    methods: {

        RMDataAnalysis(MaterialName="", batchNo="", QCNo="", parameter="", SuplierName="") {

            console.log("Gettting RMDataAnalysis")
            const resp = http.get(Endpoint+ "PMDataAnalysis?PMAnalysisID__QCNo__IGPNo__PMCode__Material"+MaterialName+"&"+"PMAnalysisID__QCNo__IGPNo__batchNo=" +batchNo+"&"+"PMAnalysisID__QCNo__QCNo=" +QCNo+"&"+"parameter=" +parameter+"&"+"PMAnalysisID__QCNo__IGPNo__S_ID__S_Name=" +SuplierName);
            console.log(resp);
            return resp;


        },


    }

}
