import axios from 'axios'
export const getAllCampanas = () =>{
    return axios.get('http://localhost:8000/campanas/api/campana/')
}
export const getSubcampanasByCampana = (campanaId) => {
    return axios.get(`http://localhost:8000/campanas/api/subcampana/`, {
        params: {
            campana_id: campanaId
        }
    });
}