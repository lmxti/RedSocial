/* <----------------------- MODULOS --------------------------> */
import axios from './root.service.js';


export const getProfile = async(id) =>{
    try {
        const response = await axios.get(`user/getUserByID/${id}`)
        console.log("response user.service", response);
        
        return response.data
    } catch (error) {
        console.log("error user.service");
        
    }
}