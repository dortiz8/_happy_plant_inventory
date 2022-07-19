
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as api from '../api/index'; 

// Helper functions 
function calculateAmount(list){
    let amount = 0; 
    list.forEach(item => amount += item.quantity); 
    return amount; 
}


//Slice ** Think of Slice as a feature for the application.

const slice = createSlice({
    name: 'plants', 
    initialState: {
        plants: [],
        amount: 0, 
        status: 'idle', //'idel' | 'loading' | 'succeeded' | 'failed'
        error: null
    }, 
    reducers: {

    }, 
    extraReducers(builder){
        builder
            .addCase(fetchAllPlants.pending, (state, action)=>{
                state.status = 'loading'; 
                console.log('loading')
            })
            .addCase(fetchAllPlants.fulfilled, (state, action)=>{
                state.status = 'succeeded'
                state.plants = action.payload
                state.amount = calculateAmount(action.payload)
            })
            .addCase(fetchAllPlants.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(createNewPlant.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(createNewPlant.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.plants.push(action.payload)
                state.amount += action.payload.quantity
            })
            .addCase(createNewPlant.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deletePlant.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deletePlant.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let newList = state.plants.filter(plant => plant._id !== action.payload); 
                state.plants =  newList
                state.amount -= action.payload.quantity
            })
            .addCase(deletePlant.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(editPlant.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(editPlant.fulfilled, (state, action) => {
                let newList = state.plants.filter(plant => plant._id !== action.payload._id);
                newList.push(action.payload); 
                state.plants = newList;
                state.amount = calculateAmount(newList); 
                state.status = 'succeeded'
            })
            .addCase(editPlant.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            
    }
}); 


export default slice.reducer; 

// Exporting State
export const SelectAllPlants = (state) => state.plants.plants;
export const getPlantsStatus = (state) => state.plants.status;
export const getPlantsError = (state) => state.plants.error;
export const getPlantsAmount = (state) => state.plants.amount; 

// Exporting Actions 
export const createNewPlant = createAsyncThunk('plants/createNewPlant', async (plantInfo) =>{
    try {
        let {data} = await api.createNewPlant(plantInfo); 
        return data; 
    } catch (error) {
        
    }
})
export const fetchAllPlants = createAsyncThunk('plants/fetchAllPlants', async () =>{
    try {
        let { data } = await api.fetchAllPlants();
        return data
    } catch (error) {

    }
})
export const deletePlant = createAsyncThunk('plants/deletePlant', async(id)=>{
    try {
        api.deleteOnePlant(id); 
        return id; 
    } catch (error) {
        
    }
})
export const editPlant = createAsyncThunk('plants/editPlant', async(plantInfo) =>{
    try {
        api.editPlant(plantInfo); 
        return plantInfo
    } catch (error) {
        
    }
})
