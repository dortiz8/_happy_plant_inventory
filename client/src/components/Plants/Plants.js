import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// Import Redux store components
import { fetchAllPlants, getPlantsError, getPlantsStatus } from '../../store/plantsSlice'; 
import { Button, Box} from '@mui/material';
import PlantListItem from './PlantListItem';
import LoadingSpinner from '../Common/LoadingSpinner'; 
import {SelectAllPlants} from '../../store/plantsSlice'; 
import ErrorMessage from '../Common/ErrorMessage';


const Plants = () => {
    const [formConfirmDelete, setFormConfirmDelete] = useState(false);
    const plantList = useSelector(SelectAllPlants); 
    const plantsStatus = useSelector(getPlantsStatus); 
    const plantsError = useSelector(getPlantsError); 

    const dispatch = useDispatch(); 
    useEffect(() => {
        if(plantsStatus == 'idle'){
            dispatch(fetchAllPlants())
        }   
    }, [plantsStatus, dispatch]); 

    function OpenFormConfirmDelete(){

    }
    let content; 
    
    if(plantsStatus == 'loading'){
        content = <LoadingSpinner />
    } else if (plantsStatus == 'succeeded'){
        content = <Box>
            {(plantList && !plantsError) && plantList.map((plant) => <PlantListItem key={plant._id} plant={plant} OpenFormConfirmDelete={OpenFormConfirmDelete} />)}
        </Box>
    } else if (plantsStatus == 'failed'){
        content = <ErrorMessage />
    }

    
    return (
        <div>
           {content}
            <Box sx={{ margin: '1rem 0', backgroundColor: 'whitesmoke' }}>
                <Button><Link to="/add-plant" replace>Add a Plant</Link></Button>
            </Box>
        </div>
    )
}

export default Plants;