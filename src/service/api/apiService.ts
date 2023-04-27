import axios, { AxiosError } from "axios";

const apiService = axios.create({
    baseURL: "http://localhost:8000"
});
// não consegui subir o backend pelo Render até o momento 

export const doGet = async(url:string)=>{
    try {
        const response = await apiService.get(url);
        return response.data
    } catch (error) {
        if (error instanceof AxiosError){
            return error.response?.data
        }
        
    }
}