import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, ListItem, Badge, Box, Paper, Avatar } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import PlantListItem from '../Plants/PlantListItem';
import { SelectAllPlants, getGenusSections } from '../../store/plantsSlice';
import { useSelector, useDispatch } from 'react-redux';
import {getPlantsStatus } from '../../store/plantsSlice';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import PlantSection from './PlantSection';

const PlantsContainer = ({searchedString}) => {
    const plantsStatus = useSelector(getPlantsStatus);
    const genusSections = useSelector(getGenusSections); 
    const plantList = useSelector(SelectAllPlants);
    const [filteredList, setFilteredList] = useState([])
    useEffect(() => {
        let list = plantList.filter(item => item.name.toUpperCase().includes(searchedString.toUpperCase()))
        setFilteredList(list)
    }, [searchedString])
    if(plantsStatus == 'loading'){
        return(<LoadingSpinner/>)
    }
    if(plantsStatus == 'failed'){
        return(<ErrorMessage />)
    }
    if (searchedString.length == 0) {
        return (
            <>
                {genusSections.map(section => <Box sx={{ }}>
                    <Typography variant="h6" sx={{marginBottom: '1rem'}}>Genus: {section}</Typography>
                   
                    {plantList.map(plant => {
                        if (plant.genus == section) return <PlantSection plantSection={plant} />
                    })}
                </Box>)}
            </>
        )
    }else{
        return(
            <div>
               
                {filteredList.map(plant => <PlantSection plantSection={plant} />)}
            </div>
        )
    }
   
}

export default PlantsContainer;