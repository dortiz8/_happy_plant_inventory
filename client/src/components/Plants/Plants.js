import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Box} from '@mui/material';
import PlantListItem from './PlantListItem';

const Plants = () => {
    const [formConfirmDelete, setFormConfirmDelete] = useState(false); 
    const plantList = useSelector((state) => state.plants.plants.data); 
    
    const dispatch = useDispatch(); 
    function OpenFormConfirmDelete(id){

    }
    
    return (
        <div>
            <Box> 
                {plantList && plantList.map((plant) => <PlantListItem key={plant._id} plant={plant} OpenFormConfirmDelete={OpenFormConfirmDelete} />)}
            </Box>
            <Box sx={{margin: '1rem 0', backgroundColor: 'whitesmoke'}}>
                <Button><Link to="/add-plant" replace>Add a Plant</Link></Button>
            </Box>
           
        </div>
    )
}

export default Plants;