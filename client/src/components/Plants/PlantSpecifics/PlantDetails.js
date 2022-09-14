import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, List, ListItem, TextField, IconButton, Card, CardHeader, CardContent, CardActions, Select, MenuItem} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import CloseRounded from '@mui/icons-material/CloseRounded';
import DoneIcon from '@mui/icons-material/Done';
import { NumericFormat } from 'react-number-format';
import {CHARACTER_LIMIT} from '../../../constants/limits'; 

import selectedFile from '../../../models/fileClass';
import PlantSpecifics from '../../../models/plantSpecifics';
import {plantType} from '../../../constants/plantType'; 
import { nanoid } from 'nanoid';

import { PlantObjectValidator } from '../../../services/validation';

const PlantDetails = ({ plantInfo, listIndex, handleSavePlant, handleDeletePlantFromList}) => {
    let plantSpecificsObject = new PlantSpecifics("", 0, "", []);
    // let localStoragePlantDetails = JSON.parse(localStorage.getItem(`plantDetails${plantInfo.idx}`)) || plantInfo
    let obj = plantInfo || plantSpecificsObject; 
    const [plantDetails, setPlantDetails] = useState(obj);
    const [uniqueID, setUniqueID] = useState(nanoid()); 
    const [formCompleted, setFormCompleted] = useState(true); 
    const [isNumericOrPositive, setIsNumericOrPositive] = useState(true); 
    const regex = new RegExp('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0 - 9]{2}$')
   console.log(plantDetails)

    function handleInputChange(event) {
        let newObj = {};

        if (event.target.name === 'price' && regex.test(event.target.value)){
            newObj[event.target.name] = event.target.value
        }
        // else newObj[event.target.name] = event.target.value;
        newObj[event.target.name] = event.target.value;
        setPlantDetails({
            ...plantDetails,
            ...newObj
        })
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    async function handleFileSelection(event) {
        let files = event.target.files;
        let tempArray = [];

        if (files) {
            for (let i = 0; i < files.length; i++) {
                let selectedFileObj = new selectedFile(files[i].name, files[i].type, files[i].size, await toBase64(files[i]));
                tempArray.push(selectedFileObj);
            };
        }
        setPlantDetails({ ...plantDetails, selectedFiles: tempArray })
    }

    function DeleteFileFromList(event) {
        let filteredList = plantDetails.selectedFiles.filter(file => file.name !== event.currentTarget.value);
        setPlantDetails({ ...plantDetails, selectedFiles: [...filteredList] });
    }
    function DeletePlantCard(){
        handleDeletePlantFromList(plantDetails.idx)
    }

    function handleClearForm() {
        let clearedDetails = new PlantSpecifics("", 0, "", [], plantDetails.idx)
        setPlantDetails(clearedDetails)
    }
    function handleSave(){
        // validation here
        if(validatePlantDetailsObject()){
            handleSavePlant(plantDetails); 
        }else{
            
        }
    }
    function handleEditMode(){
        let newobj = {...plantDetails, saved: false}
        setPlantDetails(newobj); 
    }

    function validatePlantDetailsObject(){
        let PlantValidator = new PlantObjectValidator(plantDetails);
        let result = PlantValidator.validatePlantDetailsObject();
        
        setFormCompleted(PlantValidator.hasAllRequiredFields); 
        setIsNumericOrPositive(PlantValidator.inputNumberIsValid)
        return result; 
    }
    
    return(
        <>
            <Card sx={{ maxWidth: 345, backgroundColor: '#cfd1d0', margin: '1rem .5rem'}}>
                <CardActions disableSpacing>
                    <IconButton onClick={DeletePlantCard}>
                        <CloseRounded />
                    </IconButton>
                    {plantDetails.saved && <DoneIcon />}
                </CardActions>
                <CardHeader 
                    title={`Plant #${listIndex + 1}`}
                />
                <CardContent>
                    <Box>
                        {!formCompleted && <Typography sx={{color: 'red'}}>Please fill out entire form</Typography>}
                        {!isNumericOrPositive && <Typography sx={{ color: 'red' }}>Price must be numeric and over 0.</Typography>}
                    </Box>
                    <Box>
                        <Select 
                            value={plantDetails.type}
                            label="Type"
                            name="type"
                            disabled={plantDetails.saved}
                            onChange={handleInputChange}>
                            <MenuItem value="">--</MenuItem>
                            {plantType.map(type => <MenuItem value={type} key={nanoid()}>{type}</MenuItem>)}
                        </Select>
                    </Box>
                    <Box>
                        <TextField
                            label="Price $"
                            name="price"
                            id="price"
                            disabled={plantDetails.saved}
                            inputProps={{
                                inputMode: 'numeric', pattern: '[0-9]*' }}
                            value={plantDetails.price}
                            onChange={handleInputChange}
                        />
                    </Box>
                    <Box>
                        <TextField
                            label="Description"
                            name="description"
                            disabled={plantDetails.saved}
                            id={plantDetails.idx.toString()}
                            fullWidth
                            multiline
                            maxRows={4}
                            inputProps={{ maxLength: CHARACTER_LIMIT }}
                            value={plantDetails.description}
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                    </Box>
                    <Box>
                        <input
                            style={{ display: "none" }}
                            name="selectedFiles"
                            id={uniqueID}
                            type="file"
                            multiple
                            onChange={handleFileSelection}
                        />
                        <label htmlFor={uniqueID}>
                            <Button variant="contained" component="span" disabled={plantDetails.saved}>
                                Upload Image(s)
                                </Button>
                        </label>
                        <Box>
                            <List >
                                {plantDetails.selectedFiles.map(file => <ListItem key={nanoid()}>
                                    <Typography variant="subtitle2">{`${file.name.slice(0, 10)}...${file.name.slice(file.name.length - 4, file.name.length)}`}</Typography>
                                    <Button
                                        disabled={plantDetails.saved}
                                        value={file.name}
                                        onClick={DeleteFileFromList}
                                    >
                                        <CloseRounded />
                                    </Button>
                                </ListItem>)}
                            </List>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions>
                    { plantDetails.saved ? (<Button onClick={handleEditMode}>Edit</Button>) : (
                        <>
                            <Button onClick={handleSave}>Save</Button>
                            <Button onClick={handleClearForm}>Clear</Button>
                        </>
                    )
                        
                    }
                </CardActions>
            </Card>                       
                        </>
    )
}

export default PlantDetails;