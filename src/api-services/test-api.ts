import { getKeycloakBearerToken } from "../kc-config/keycloak-config";
import { api } from "./axios-api-config"


export const callPublicTestAPI = async () =>{
    return api.get("/public/testv1");
}

export const callPrivateTestAPI = async ()=>{
    return api.get("/private/testv1", {
        headers:{
            "Authorization":"Bearer " + getKeycloakBearerToken(),
            "Content-Type":"application/json"
        }
    });
}

