import axios from "axios";

export interface RequestHeader {
    "key": string
    "value": string,
}


export const api = axios.create({
    baseURL: "http://localhost:3001/api",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
});
api.defaults.headers.post['Content-Type'] = "application/json";


export const deleteAuthorizationToken = () => {
    api.defaults.headers.common['Authorization'] = "";
}

export const setHeaders = (headers: RequestHeader[]) => {
    headers.forEach(header => {
        api.defaults.headers.common[header.key] = header.value;
    });
}
