import React, { useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// Import Redux store components
import { fetchAllPlants, getPlantsAmount, getPlantsStatus } from '../../store/plantsSlice'; 
import { Button, Box, Input, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; 
import AddIcon from '@mui/icons-material/Add';
import {SelectAllPlants} from '../../store/plantsSlice'; 
import PlantsContainer from './PlantsContainer';

const Plants = () => {
    const plantsStatus = useSelector(getPlantsStatus); 
    const plantList = useSelector(SelectAllPlants); 
    const plantsAmount = useSelector(getPlantsAmount); 
    const [searchedString, setSearchedString] = useState("");

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
 
    // Work functions 

    function handleSearchedStringChange(e){
        setSearchedString(e.target.value)
    }
    function focus(){
        searchBarRef.current.firstChild.focus()
    }
    
    return (
        <div>
            <Typography>Collection Total: {plantsAmount}</Typography>
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
            <PlantsContainer searchedString={searchedString} />
        </div>
    )
}

export default Plants;