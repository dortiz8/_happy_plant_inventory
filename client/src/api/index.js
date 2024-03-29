import axios from 'axios'; 


const API = axios.create({ baseURL: 'http://localhost:5000' }); 

export const createNewPlant = (plantInfo) => API.post('/plants/add-plant', plantInfo); 
export const fetchAllPlants = () => API.get('/plants/view-plants'); 
export const fetchOnePlant = (id) => API.get(`/plants/view-plant/${id}`); 
export const deleteOnePlant = (sectionId, id) => API.delete(`/plants/delete-plant/${sectionId}/${id}`); 
export const editPlant = (plantInfo) => API.patch(`/plants/edit-plant`, plantInfo); 