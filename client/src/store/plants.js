
import {createSlice} from '@reduxjs/toolkit'; 
import * as api from '../api/index'; 
//Slice 

const slice = createSlice({
    name: 'plantState', 
    initialState: {
        plants: [],
        plant: {}
    }, 
    reducers: {
        fetchAll: (state, action) =>{
            state.plants = action.payload; 
        }, 
        fetchOne: (state, action) =>{
            state.plant = action.payload
        },
        createPlant: (state, action) =>{
            console.log(action.payload, ' from reducer ', ' state ', state.plants)
            state.plants = [...state.plants, action.payload]
        }
    }
}); 

export default slice.reducer; 

// Actions
const {fetchAll, fetchOne, createPlant} = slice.actions; 

export const createNewPlant = (plantInfo) => async (dispatch)=>{
    try{
        console.log(plantInfo)
        let {data} = await api.addNewPlant(plantInfo); 
        dispatch(createPlant({data}))
    }catch(error){
        console.log(error)
    }
}; 

export const fetchAllPlants = () => async (dispatch)=>{
    try {
        let {data} = await api.fetchAllPlants(); 
        dispatch(fetchAll({data}))
    } catch (error) {
        
    }
}

export const fetchOnePlant = (id) => async (dispatch) =>{
    try{
        let {data} = await api.fetchOnePlant(id); 
        console.log(data, ' from store')
        dispatch(fetchOne({data})); 
    } catch(error){
        console.log(error)
    }
}