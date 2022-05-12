import React from 'react';
import {useState, useEffect} from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
// Redux store functions
import { createNewPlant} from '../../store/plants';
// Material UI Section 
import { Button, Typography, Paper, Box, Input, InputLabel, Select, MenuItem, List, ListItem} from '@mui/material';
import CloseRounded from '@mui/icons-material/CloseRounded'; 
// Component Imports
import FormConfirmAddPlant from './FormConfirmAddPlant'; 
import FormConfirmClear from './FormConfirmClear';
// Other imports 
import plantCategories from '../../lists/plantCategories';
import sizes from '../../constants/sizes'; 
import {CHARACTER_LIMIT} from '../../constants/limits'; 
import selectedFile from '../../models/fileClass'; 
let blankState = {name: "", category: "", quantity: 0, size: "", description: "", price: 0, selectedFiles: []}
const FormAddPlant = (e) => {
    // Component State section 
    let localStorageData = JSON.parse(localStorage.getItem('plantInfo')) || blankState; 
    const [plantInfo, setPlantInfo] = useState(localStorageData);
    const [formHasAllRequiredFields, setFormHasAllRequiredFields] = useState(true); 
    const [inputOfNumberValid, setInputOfNumberValid] = useState(true); 
    const [formConfirmVisible, setFormConfirmVisible] = useState(false); 
    const [formConfirmClearVisible, setFormConfirmClearVisible] = useState(false); 
    const dispatch = useDispatch()
    console.log(plantInfo)

    useEffect(()=>{
        localStorage.setItem('plantInfo', JSON.stringify(plantInfo))
    })
    function handleInputChange(event){
        let newObj = {}; 
        if (!isNaN(parseInt(event.target.value))){
            newObj[event.target.name] = parseInt(event.target.value);
        }else{
            newObj[event.target.name] = event.target.value;
        }       
        setPlantInfo({
            ...plantInfo, 
            ...newObj
        })
    }; 
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    async function handleFileSelection(event){
        let files = event.target.files; 
        let tempArray = []; 

        if(files){
            for (let i = 0; i < files.length; i++) {
                let selectedFileObj = new selectedFile(files[i].name, files[i].type, files[i].size, await toBase64(files[i]));
                tempArray.push(selectedFileObj);
            }; 
            setPlantInfo({...plantInfo, selectedFiles: tempArray})
        }
    }
    function DeleteFileFromList(event){
        let filteredList = plantInfo.selectedFiles.filter(file => file.name !== event.currentTarget.value); 
        setPlantInfo({...plantInfo, selectedFiles: [...filteredList]}); 
    }

    function handlePreSubmit(e){
        // Prevent postback 
        e.preventDefault(); 
        if(submitValidation()){
            setFormConfirmVisible(true); 
        }
    }
    function handleSubmit(e){
        dispatch(createNewPlant(plantInfo));
        setFormConfirmVisible(false); 

    }

    function handleClearForm(){
        setPlantInfo(blankState)
    }

    function submitValidation(){
        let result = true; 
        if(!(plantInfo.name.trim() !== "" && plantInfo.category.trim() !== "" && plantInfo.quantity !== 0 && plantInfo.size.trim() !== "" && plantInfo.description.trim()  !== "" && plantInfo.price !== 0 && plantInfo.selectedFiles.length !== 0)){
            result = false; 
            setFormHasAllRequiredFields(false);
        } else if (isNaN(parseInt(plantInfo.quantity)) || parseInt(plantInfo.quantity) < 0){
            result = false; 
            setInputOfNumberValid(false);
            setFormHasAllRequiredFields(true);
        } else if (parseInt(plantInfo.price) < 0){
            result = false; 
            setInputOfNumberValid(false);
            setFormHasAllRequiredFields(true);
        } else {
            setFormHasAllRequiredFields(true);
            setInputOfNumberValid(true);
            return result; 
        }
    }
    
    return (
        <Paper>
            {formConfirmVisible && <FormConfirmAddPlant plantInfo={plantInfo} setFormConfirmVisible={setFormConfirmVisible} handleSubmit={handleSubmit}/>}
            {formConfirmClearVisible && <FormConfirmClear handleClearForm={handleClearForm} setFormConfirmClearVisible={setFormConfirmClearVisible}/>}
            {formConfirmVisible || formConfirmClearVisible ? <></> : 
                <form autoComplete="off" noValidate onSubmit={(e) => handlePreSubmit(e)}>
                    <Box>
                        <Typography>Describe the new member!</Typography>
                    </Box>
                    <Box>
                        {!formHasAllRequiredFields && <Typography color="error">* All fields and images are required.</Typography>}
                        {!inputOfNumberValid && <Typography color="error">* Quantity or Price is not a valid number.</Typography>}
                    </Box>
                    <Box>
                        <Box>
                            <InputLabel>Name</InputLabel>
                            <Input name="name" type="text" value={plantInfo.name} onChange={handleInputChange}></Input>
                        </Box>
                        <Box>
                            <InputLabel>Category</InputLabel>
                            <Select label="Category" name="category" value={plantInfo.category} onChange={handleInputChange}>
                                <MenuItem value=""> -- </MenuItem>
                                {
                                    plantCategories.map(category => <MenuItem key={plantCategories.indexOf(category)} value={category}>{category}</MenuItem>)
                                }
                            </Select>
                        </Box>
                        <Box>
                            <InputLabel>Quantity</InputLabel>
                            <Input name="quantity" type="number" value={plantInfo.quantity} onChange={handleInputChange}></Input>
                        </Box>
                        <Box>
                            <InputLabel>Size</InputLabel>
                            <Select label="Size" name="size" value={plantInfo.size} onChange={handleInputChange}>
                                <MenuItem value=""> -- </MenuItem>
                                {
                                    sizes.map(size => <MenuItem key={sizes.indexOf(size)} value={size}>{size}</MenuItem>)
                                }
                            </Select>
                        </Box>
                        <Box>
                            <InputLabel>Description</InputLabel>
                            <Input name="description"
                                type="text"
                                multiline
                                maxRows={4}
                                fullWidth
                                inputProps={{ maxLength: CHARACTER_LIMIT }}
                                value={plantInfo.description}
                                onChange={handleInputChange}></Input>
                        </Box>
                        <Box>
                            <InputLabel>Price</InputLabel>
                            $<Input name="price" type="number" value={plantInfo.price} onChange={handleInputChange}></Input>
                        </Box>
                        <Box>
                            <InputLabel>Image(s)</InputLabel>
                            <input
                                style={{ display: "none" }}
                                name="selectedFiles"
                                id="contained-button-file"
                                type="file"
                                multiple
                                onChange={handleFileSelection}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span">
                                    Upload
                                </Button>
                            </label>
                            <Box>
                                <List>
                                    {plantInfo.selectedFiles.map(file => <ListItem key={plantInfo.selectedFiles.indexOf(file)}>
                                        <Typography variant="subtitle2">{`${file.name.slice(0, 10)}...${file.name.slice(file.name.length - 4, file.name.length)}`}</Typography>
                                        <Button
                                            value={file.name}
                                            onClick={DeleteFileFromList}
                                        >
                                            <CloseRounded />
                                        </Button>
                                    </ListItem>)}
                                </List>
                            </Box>
                        </Box>
                    </Box>
                    <Box margin={'2rem 0'}>
                        <Button variant="contained" size="large" type="submit">Add</Button>
                        <Button variant="contained" color="error" size="large" onClick={() => setFormConfirmClearVisible(true)}>Clear</Button>
                    </Box>
                </form>
            }
        </Paper>
    )
}

export default FormAddPlant;