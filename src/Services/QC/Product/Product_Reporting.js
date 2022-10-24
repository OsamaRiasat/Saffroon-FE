import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.js"

const data="QualityControl/"
const Endpoint=apiUrl+data

export default{


    methods: {

        RMDataAnalysis(Product="", batchNo="", QCNo="", parameter="", Stage="") {

            console.log("Gettting RMDataAnalysis")
            const resp = http.get(Endpoint+ "ProductDataAnalysis?ProductAnalysisID__QCNo__batchNo__ProductCode__Product="+Product+"&"+"ProductAnalysisID__QCNo__batchNo__batchNo=" +batchNo+"&"+"ProductAnalysisID__QCNo__QCNo=" +QCNo+"&"+"parameter=" +parameter+"&"+"ProductAnalysisID__QCNo__sampleStage=" +Stage);
            console.log(resp);
            return resp;

        },


    }

}
