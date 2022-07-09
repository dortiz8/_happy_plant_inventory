import React, { useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// Import Redux store components
import { fetchAllPlants, getPlantsError, getPlantsStatus } from '../../store/plantsSlice'; 
import { Button, Box, Input, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; 
import AddIcon from '@mui/icons-material/Add';
import PlantListItem from './PlantListItem';
import LoadingSpinner from '../Common/LoadingSpinner'; 
import {SelectAllPlants} from '../../store/plantsSlice'; 
import ErrorMessage from '../Common/ErrorMessage';


const Plants = () => {
    const plantsStatus = useSelector(getPlantsStatus); 
    const plantList = useSelector(SelectAllPlants); 
    const [searchedString, setSearchedString] = useState("");
    const [filteredList, setFilteredList] = useState([])
    const searchBarRef = useRef();  
    const currentRef = useRef(1);
    
    const dispatch = useDispatch(); 

    // UseEffects only

    useEffect(()=>{
        // used to count current renders
        currentRef.current = currentRef.current + 1; 
    })
    useEffect(() => {
        if(plantsStatus == 'idle'){
            dispatch(fetchAllPlants())
        }   
    }, [plantsStatus,dispatch]); 

    useEffect(()=>{
        let list = plantList.filter(item => item.name.toUpperCase().includes(searchedString.toUpperCase()))
        setFilteredList(list)
    }, [searchedString])
 
    // Work functions 

    function handleSearchedStringChange(e){
        setSearchedString(e.target.value)
    }
    function focus(){
        searchBarRef.current.firstChild.focus()
        
    }

    // Display Content 

    let content; 
    
    if(plantsStatus == 'loading'){
        content = <LoadingSpinner />
    } else if (plantsStatus == 'succeeded'){
        
        if(plantList.length > 0 && filteredList.length ==0){
            console.log('plantList')
            content = <Box>{plantList.map((plant) => <PlantListItem key={plant._id} plant={plant} />)}</Box>
        }else{
            console.log('filtered', plantList.length, filteredList.length)
            content = <Box>{filteredList.map((plant) => <PlantListItem key={plant._id} plant={plant} /> )}</Box>
        }
    } else if (plantsStatus == 'failed'){
        content = <ErrorMessage />
    }

    
    return (
        <div>
            <Typography>{currentRef.current}</Typography>
            <Box sx={{ margin: '1rem 0', backgroundColor: 'whitesmoke'}}>
                <Box>
                        <Input 
                            onChange={handleSearchedStringChange}
                            sx={{ width: '60%'}}
                            ref={searchBarRef}></Input>
                        <Button onClick={focus}>
                            <SearchIcon />
                        </Button>
                        <Typography>{searchedString}</Typography>
                </Box>
                <Box>
                    <Button><Link to="/add-plant" replace><AddIcon />Plant</Link></Button>
                </Box>
               
            </Box>
           {content}
        </div>
    )
}

export default Plants;