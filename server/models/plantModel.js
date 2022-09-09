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
const selectedFileSchema = mongoose.Schema({
    base64: String, 
    name: String, 
    size: Number, 
    type: String,
})
export const plantDetailsSchema = mongoose.Schema({
    description: String, 
    idx: Number, 
    price: Number,
    saved: Boolean, 
    selectedFiles: [selectedFileSchema],
    type: String, 

})
const plantObjectSchema = mongoose.Schema({
    name: String, 
    genus: String, 
    multiple: [plantDetailsSchema], 
})


// Use schema to create a model
const PlantModel = mongoose.model('plant_inventory', plantObjectSchema);

export default PlantModel; 

