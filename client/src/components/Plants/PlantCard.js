import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOnePlant } from '../../store/plants';
import { Button, Typography, Card, CardMedia, CardContent, CardActions, Box, Input, InputLabel} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useParams } from 'react-router-dom';
const PlantCard = () => { 
    const { id } = useParams();
    const plant = useSelector((state) => state.plants.plant.data); 
    const [editMode, setEditMode] = useState(false); 
    const dispatch = useDispatch(); 
    
    useEffect(()=>{
        dispatch(fetchOnePlant(id))
        
    },[id])

    function handleInputChange(){

    }
    function handleEditMode(){
        setEditMode(!editMode)
    }
    return (

            <Card sx={{margin: "10px"}}>          
                <CardMedia component="img" height="200"  image={`${plant?.selectedFiles[0].base64}`} />
                    { editMode ? (
                        <CardContent>
                            <Box>
                                <Input name='name' sx={{ display: 'block' }} placeholder={`Name: ${plant?.name}`} onChange={handleInputChange}></Input>
                                <Input name='category' sx={{ display: 'block' }} placeholder={`Category: ${plant?.category}`} onChange={handleInputChange}></Input>
                                <Input name='size' sx={{ display: 'block' }} placeholder={`Size: ${plant?.size}`} onChange={handleInputChange}></Input>
                                <Input name='status' sx={{ display: 'block' }} placeholder={`Status: ${plant?.status}`} onChange={handleInputChange}></Input>
                                <Input name='price' sx={{ display: 'block' }} placeholder={`Price: ${plant?.price}`} onChange={handleInputChange}></Input>
                            </Box>
                        </CardContent>
                    ) : (
                    <CardContent>
                        <Typography variant='h4'>{plant?.name}</Typography>
                        <Typography><b>Category: </b>{plant?.category}</Typography>
                        <Typography><b>Size: </b>{plant?.size}</Typography>
                        <Typography><b>Status: </b>{plant?.status}</Typography>
                        <Typography><b>Price: </b>${plant?.price}</Typography>
                    </CardContent>
                    )
                    
                    }
                    
                
                <CardActions>
                    <Link to="/plants" replace><ArrowLeftIcon /></Link>
                    <Button onClick={handleEditMode}>{
                    editMode ? <DeleteForeverIcon/> : <EditIcon />
                    }</Button>
                    <Button color="warning"><DeleteForeverIcon /></Button>
                </CardActions> 
            </Card>
        
      
    )
}

export default PlantCard;