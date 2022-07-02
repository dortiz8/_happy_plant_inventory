
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api/index';

const slice = createSlice({
    name: 'plant',
    initialState: {
        plant: {},
        status: 'idle', //'idel' | 'loading' | 'succeeded' | 'failed'
        error: null
    },
    reducers: {
        resetState(state){
            state.plant.data = {}; 
            state.status = 'idle'; 
        }
    }, 
    extraReducers(buildrer){
        buildrer
            .addCase(fetchPlant.pending, (state,action)=>{
                state.status = 'loading';
            })
            .addCase(fetchPlant.fulfilled, (state, action) => {
                if(action.payload != undefined){
                    console.log(action.payload, " payload from store")
                    state.plant.data = action.payload
                    state.status = 'succeeded'
                }else{
                    state.status = 'failed'
                }
            })
            .addCase(fetchPlant.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})
export default slice.reducer; 

export const { resetState } = slice.actions;

export const SelectSinglePlant = (state) => state.plant.plant.data; 
export const getPlantStatus = (state) => state.plant.status; 
export const getPlantError = (state) => state.plant.error; 

export const resetPlantstate = async ()=>{
    resetState()
}


export const fetchPlant = createAsyncThunk('plant/fetchPlant', async (id) => {
    try {
        console.log(id)
        let { data } = await api.fetchOnePlant(id);
        return data
    } catch (error) {

    }
})