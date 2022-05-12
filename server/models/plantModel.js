import mongoose from 'mongoose'; 

// First create a mongoose schema
const plantSchema = mongoose.Schema({
    name: String,
    category: String, 
    quantity: Number,
    size: String,  
    description: String,
    selectedFiles: {
        type: Array, 
        default: []
    },
    supplierId: {
        type: String, 
        default: 'SUP00'
    },
    price: Number,
    createdAt:{
        type: Date, 
        default: new Date()
    }, 
    status:{
        type: String, 
        default: 'active'
    }
}); 

// Use schema to create a model
const PlantModel = mongoose.model('plant_inventory', plantSchema); 

export default PlantModel; 

