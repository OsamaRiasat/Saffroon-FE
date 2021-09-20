import http from "../http/httpService.js"
import {apiUrl} from "../../config.json" 

const data="Account/api/"
const Endpoint=apiUrl+data 

export default{
    
 
    methods: {
        
        getRoles()
        {
            const resp = http.get(Endpoint+"roles/",);
            console.log(resp);
            return resp;
        },
        getUsers()
        {
            const resp = http.get(Endpoint+"users/profile/");
            return resp;
        }
        

    }

}

