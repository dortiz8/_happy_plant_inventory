import express from 'express'; 

// Remember to add .js for every path. 
// Specific to Node.js

// Import controllers 
import {addPlant, getPlants, getPlant, deletePlant, editPlant} from '../controllers/plants.js'
const router = express.Router(); 

// Products
router.get('/', (req,res)=>{
    res.send('Plants Home Page')
})

// Plants 
router.post('/add-plant', addPlant)
router.get('/view-plants', getPlants)
router.get('/view-plant/:id', getPlant)
router.delete('/delete-plant/:id', deletePlant)
router.patch('/edit-plant', editPlant)

export default router; 