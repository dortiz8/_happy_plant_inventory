import {configureStore} from '@reduxjs/toolkit'; 
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import plants from './plantsSlice'; 
import plant from './plantSlice'; 
// Reducer imports 

const reducer = combineReducers({
    plants, 
    plant
})
// configure your redux store to keep track of state accross the application
const store = configureStore({
    reducer, 
    middleware: [thunk]
}); 

export default store; 