import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, ListItem, Badge, Box } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import PlantListItem from '../Plants/PlantListItem';
import { SelectAllPlants } from '../../store/plantsSlice';
import { useSelector, useDispatch } from 'react-redux';
import {getPlantsStatus } from '../../store/plantsSlice';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';

const PlantsContainer = ({searchedString}) => {
    const plantsStatus = useSelector(getPlantsStatus);
    const plantList = useSelector(SelectAllPlants);
    const [filteredList, setFilteredList] = useState([])
    console.log(filteredList)
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
            plantList.map(plant => <PlantListItem key={plant._id} plant={plant} />)
        )
    }else{
        return(
            filteredList.map(plant => <PlantListItem key={plant._id} plant={plant} />)
        )
    }
   
}

export default PlantsContainer;