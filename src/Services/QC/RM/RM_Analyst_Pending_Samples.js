import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.json" 

const data="QualityControl/"
const Endpoint=apiUrl+data 

export default{
    
 
    methods: {
        
        // List of assigned samples of the user that is logined
        CurrentAnalystSample() {

            console.log("Gettting CurrentAnalystSamples")
            const resp = http.get(Endpoint + "CurrentAnalystSample/",{ 'headers': { 'Authorization': "Token"+" "+sessionStorage.getItem("token") } });
            console.log(resp);
            return resp;
        
        }
        
    }   

}
