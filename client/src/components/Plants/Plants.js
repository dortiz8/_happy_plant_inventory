import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button, Typography, Box} from '@mui/material';
import PlantListItem from './PlantListItem';

const Plants = () => {
    const viewPlantCard = useState(false); 
    const plantList = useSelector((state) => state.plants.plants.data); 

    return (
        <div>
            <Box> 
                {plantList && plantList.map((plant) => <PlantListItem plant={plant}/>)}
            </Box>
            <Box sx={{margin: '1rem 0', backgroundColor: 'whitesmoke'}}>
                <Button><Link to="/add-plant" replace>Add a Plant</Link></Button>
            </Box>
           
        </div>
    )
}

export default Plants;