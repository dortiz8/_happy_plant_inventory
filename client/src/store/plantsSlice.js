
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as api from '../api/index'; 

//Slice 

const slice = createSlice({
    name: 'plants', 
    initialState: {
        plants: [],
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
                console.log(action.payload)
                let newList = state.plants.filter(plant => plant._id !== action.payload); 
                state.plants =  newList
            })
            .addCase(deletePlant.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(editPlant.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(editPlant.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let newList = state.plants.filter(plant => plant._id !== action.payload._id);
                newList.push(action.payload); 
                console.log(newList)
                state.plants = newList; 
            })
            .addCase(editPlant.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            
    }
}); 


export default slice.reducer; 

// Actions
const {fetchAll, createPlant, deleteOne} = slice.actions;

export const SelectAllPlants = (state) => state.plants.plants;
export const getPlantsStatus = (state) => state.plants.status;
export const getPlantsError = (state) => state.plants.error;

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
