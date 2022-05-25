import mongoose from 'mongoose'; 
import PlantModel from '../models/plantModel.js'

export const addPlant = async(req, res) => {
    //Access the request body 
    let plantInfo = req.body; 
    const newPlant = new PlantModel({...plantInfo}); 
    try{
        await newPlant.save(); 
        res.status(201).json(newPlant);
    } catch(error){
        console.log(error)
    }
}

export const getPlants = async (req, res) =>{
    
    try{
        let result = await PlantModel.find(); 
        res.status(201).json(result); 
    } catch{
        res.status(404).json({ message: error.message });
    }
}

export const getPlant = async (req, res)=>{
    const {id} = req.params
    try {
        let result = await PlantModel.findById(id)
        res.status(201).json(result)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deletePlant = async (req, res) =>{
    //Access the id sent with request
    const {id} = req.params; 
    try {
        res.send(id); 
    } catch (error) {
        console.log(error.message)
    }
}

