import mongoose from 'mongoose'; 

import PlantModel from '../models/plantModel.js'; 
import { plantDetailsSchema} from '../models/plantModel.js'; 

export const addPlant = async(req, res) => {
    //Access the request body 
    let plantInfo = req.body; 
    const newPlant = new PlantModel({ ...plantInfo });
    try {
        await newPlant.save();
        res.status(201).json(newPlant);
    } catch (error) {
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
        let result; 
        let response = await PlantModel.find({"multiple._id": `${id}`})
        console.log(response[0])
        if (response.length > 0){
            response[0].multiple.forEach(item => {
                if(item._id == id){
                    // Since we are not able to add new properties to a mongoose object 
                    // we convert the document into a plain object
                    let obj = item.toObject(); 
                    obj.parentName = response[0].name
                    result = obj
                }
            })
        }
        res.status(201).json(result)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deletePlant = async (req, res) =>{
    //Access the id sent with request
    const {sectionId, id} = req.params;  
    try {
        // obtain parent id to delete if the category does not contain any children
        console.log(sectionId, ' parent---->', id, ' childid --> ')
        // update the sub-document that matches the specific id
        let response = await PlantModel.updateMany({}, {$pull: {
            multiple:{
                _id: id
            }
        }},{
            multi: true
        })
        if(response.acknowledged){
            let parent = await PlantModel.findById(sectionId); 
            console.log(parent, ' parent---->')
            if(parent && parent.multiple.length == 0){
                await PlantModel.findOneAndDelete(parent)
            }
        }
      
        res.json({message: 'Plant deleted successfully'})
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const editPlant = async (req, res)=> {
    const plantInfo = req.body; 
    try {
        console.log(plantInfo._id, plantInfo)
        let result = await PlantModel.findByIdAndUpdate(plantInfo._id, plantInfo); 
        res.status(201).json(result); 
    } catch (error) {
        res.status(404).json({message: error.message}); 
    }
}

