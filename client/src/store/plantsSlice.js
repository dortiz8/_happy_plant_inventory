
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as api from '../api/index'; 

// Helper functions 
function calculateAmount(list){
    let amount = 0; 
    list.forEach(item => amount += item.multiple.length); 
    return amount; 
}


//Slice ** Think of Slice as a feature for the application.

const slice = createSlice({
    name: 'plants', 
    initialState: {
        plants: [],
        genusSections: [],
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
                
                // delete any sections with no plants 
                let filteredList = action.payload.filter(item => item.multiple.length !== 0); 
                // sort returned planst by genus 
                state.plants = filteredList.sort((a,b)=>{
                    if(a.genus.toUpperCase() > b.genus.toUpperCase()) return 1; 
                    if (a.genus.toUpperCase() < b.genus.toUpperCase())  return -1; 
                    return 0; 
                }); 
                // get total amount of plants 
                state.amount = calculateAmount(action.payload)

                // obtain list of genus to create sections 
                // first map to prevent adding doubles and then create array
                let genusMap = new Map();
                let genusArr = [];

                filteredList.forEach(item => genusMap.set(item.genus, item.genus))
                genusMap.forEach(item => genusArr.push(item)); 

                state.genusSections = genusArr
                state.status = 'succeeded'
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
                state.status = 'idle'
                state.amount++; 
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
                state.status = 'idle'
                state.amount--
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
export const getGenusSections = (state) => state.plants.genusSections;
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

// Mock object 
// let data = {
//     category: 'Sample Category', 
//     name: 'Sample Name', 
//     _id: '62ec7fe5797561104ce8d327',
//     multiple: [
//         { description: 'Node sample', idx: 0, price: 10, saved: true, selectedFiles: [{ base64: '../images/cactus_sample.jpeg', name: 'monsterra-node_sample.jpeg', size: 1272869, type: 'image/jpeg', _id: '62ec7fe5797561104ce8d329' }] },
//         { description: 'Node sample', idx: 0, price: 10, saved: true, selectedFiles: [{ base64: '../images/choco_red1_sample.jpeg', name: 'monsterra-node_sample.jpeg', size: 1272869, type: 'image/jpeg', _id: '62ec7fe5797561104ce8d329' }] },
//     ]
    
// }


// If you are passing multiple parameters to these async functions pass them within an object 
// the async callback function accepts two parameters and the second one is fixed as a ThunkAPI

export const fetchAllPlants = createAsyncThunk('plants/fetchAllPlants', async () =>{
    try {
        let { data } = await api.fetchAllPlants();
        
        return data
    } catch (error) {

    }
})
export const deletePlant = createAsyncThunk('plants/deletePlant', async(idInfoObject)=>{
    try {
        api.deleteOnePlant(idInfoObject.sectionId, idInfoObject.id);
        return idInfoObject;
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
