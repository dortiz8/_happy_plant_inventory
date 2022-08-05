import React from 'react';
import {useState, useEffect} from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
// Redux store functions
import { createNewPlant} from '../../store/plantsSlice';
// Material UI Section 
import { Button, Typography, Paper, Box, Input, InputLabel, Select, MenuItem, List, ListItem, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel} from '@mui/material';
import CloseRounded from '@mui/icons-material/CloseRounded';

import AddIcon from '@mui/icons-material/Add';
// Component Imports
import FormConfirmAddPlant from './FormConfirmAddPlant'; 
import FormConfirmClear from './FormConfirmClear';
// Other imports 
import plantCategories from '../../lists/plantCategories';

import { useNavigate } from 'react-router';
import { PlantObjectValidator } from '../../services/validation';
import GeneralPlantInfo from '../../models/generalPlantInfo';

import PlantDetails from './PlantSpecifics/PlantDetails';
import PlantSpecifics from '../../models/plantSpecifics';
import {nanoid} from 'nanoid'; 
import plantSpecifics from '../../models/plantSpecifics';
import WarningMessage from '../Common/WarningMessage';

const FormAddPlant = (e) => {
    // Initialize the object 
    let generalPlantObject = new GeneralPlantInfo("", "");


    // Component State section 
    let localStorageData = JSON.parse(localStorage.getItem('plantInfo')) || generalPlantObject; 
    let localStorageQuantityArray = JSON.parse(localStorage.getItem('quantityArray')) || []; 
    let localStoragePlantIndex = JSON.parse(localStorage.getItem('plantIndex')) || 1; 

    const [plantInfo, setPlantInfo] = useState(localStorageData);
    const [quantityArray, setQuantityArray] = useState(localStorageQuantityArray); 
    const [multiple, setMultiple] = useState(quantityArray.length > 1); 
    const [plantIndex, setPlantIndex] = useState(localStoragePlantIndex);
    const [disableAdd, setDisableAdd] = useState(false)
    const [formHasAllRequiredFields, setFormHasAllRequiredFields] = useState(true); 
    const [isQuantityArrayValid, setisQuantityArrayValid] = useState(true); 
    const [formConfirmVisible, setFormConfirmVisible] = useState(false); 
    const [formConfirmClearVisible, setFormConfirmClearVisible] = useState(false); 
    const [showWarningMessage, setShowWarningMessage] = useState(false); 

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(!quantityArray.length){
            let arr = []; 
            arr.push(new PlantSpecifics("", 0, "", [], 0))
            setQuantityArray(arr); 
        }else{
            if(!validateQuantityArray(true)){
                setDisableAdd(true); 
            }else{
                setDisableAdd(false);
            }
        }
    },[quantityArray])
    // Setting plantInfo into local storage
    useEffect(()=>{
        localStorage.setItem('plantInfo', JSON.stringify(plantInfo))
        localStorage.setItem('quantityArray', JSON.stringify(quantityArray));
        localStorage.setItem('plantIndex', JSON.stringify(plantIndex));
    }, [plantInfo, quantityArray, plantIndex])


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
    
    function handleMultiple(e){
        let val = e.target.value; 
        if(val.toLocaleUpperCase() == "Single".toLocaleUpperCase()){
            if(quantityArray.length > 1){
                setShowWarningMessage(true)
            }
        }else{
            setMultiple(true); 
        } 
    }
    function handleSwitchingFromMultipleToSingle(){
        setQuantityArray([]); 
        setMultiple(false); 
        setShowWarningMessage(false); 
    }

    function handleDeletePlantFromList(idx){
        let filteredArr = quantityArray.filter(obj => obj.idx !== idx)
        setQuantityArray(filteredArr);
    }

    function handleAddPlantToList(){
        let tempArr = [...quantityArray, new PlantSpecifics("", 0, "", [], plantIndex) ];
        setQuantityArray(tempArr); 
        setPlantIndex(plantIndex + 1)
    }

    function handleSavePlant(detailsObj){
        // validation here
        let newObj = quantityArray.find(obj => detailsObj.idx == obj.idx)
        let idxOfObj = quantityArray.indexOf(newObj);
        detailsObj.saved = true; 
        let newArr = [...quantityArray.slice(0,idxOfObj), detailsObj, ...quantityArray.slice(idxOfObj+1)]; 
        setQuantityArray(newArr); 
    }

    function handlePreSubmit(e){
        // Prevent postback 
        e.preventDefault(); 
        if (validatePlantObject() && validateQuantityArray()){
            setFormConfirmVisible(true); 
        }
    }
    function handleSubmit(e){
        e.preventDefault(); 
        // Add quantity array to our plant object
        plantInfo.multiple = quantityArray; 
        //console.log(plantInfo)
        dispatch(createNewPlant(plantInfo));
        // setFormConfirmVisible(false); 
        // setPlantInfo({...generalPlantObject})
        // localStorage.removeItem('plantInfo'); 
        // navigate('/plants', {replace: true})
    }

    function handleClearForm(){
        setPlantInfo(generalPlantObject)
    }
    function validateQuantityArray(validateWithoutErrors = null){
        let result = true; 
        for (let i = 0; i < quantityArray.length; i++) {
            const details = quantityArray[i];
            if(!details.saved){
                if(!validateWithoutErrors) setisQuantityArrayValid(false); 
                return false; 
            } 
        }
        
        console.log(result, ' qty array')
        return result; 
    }
    function validatePlantObject(){
        let PlantValidator = new PlantObjectValidator(plantInfo); 
        let result  = PlantValidator.validatePlantObject(); 
        setFormHasAllRequiredFields(PlantValidator.hasAllRequiredFields); 
        return result; 
    }
    
    return (
        <Paper>
            {formConfirmVisible && <FormConfirmAddPlant plantInfo={plantInfo} quantityArray={quantityArray} setFormConfirmVisible={setFormConfirmVisible} handleSubmit={handleSubmit}/>}
            {formConfirmClearVisible && <FormConfirmClear handleClearForm={handleClearForm} setFormConfirmClearVisible={setFormConfirmClearVisible}/>}
            {showWarningMessage && <WarningMessage message="Changing to Single will delete all other plants. Do you wish to proceed?" handleYes={handleSwitchingFromMultipleToSingle} handleNo={()=>setShowWarningMessage(false)}/>}
            {formConfirmVisible || formConfirmClearVisible ? <></> : 
                <form autoComplete="off" noValidate onSubmit={(e) => handlePreSubmit(e)}>
                
                    <Box>
                        <Typography>Describe the new member!</Typography>
                    </Box>
                    <Box>
                        {!formHasAllRequiredFields && <Typography color="error">* Name and Category are required.</Typography>}
                        {!isQuantityArrayValid && <Typography color="error">* Please save all plants. You can discard if necessary.</Typography>}
                    </Box>
                    <Box sx={{backgroundColor: '#FAFAFA', margin: '1rem 0'}}>
                        <Box>
                            <InputLabel>Name</InputLabel>
                            <Input name="name" type="text" value={plantInfo.name} onChange={handleInputChange}></Input>
                        </Box>
                        <Box>
                            <InputLabel>Category</InputLabel>
                            <Select label="Category" name="category" value={plantInfo.category ? plantInfo.category : ''} onChange={handleInputChange}>
                                <MenuItem value=""> -- </MenuItem>
                                {
                                    plantCategories.map(category => <MenuItem key={plantCategories.indexOf(category)} value={category}>{category}</MenuItem>)
                                }
                            </Select>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormLabel>How Many?</FormLabel>
                                <RadioGroup onChange={handleMultiple}>
                                    <FormControlLabel value="Single" label="Single" control={<Radio checked={!multiple} />} />
                                    <FormControlLabel value="Multiple" label="Multiple" control={<Radio checked={multiple} />} />
                                </RadioGroup>
                            </FormControl>
                            {multiple && <Box><Button variant="contained" color="success" disabled={disableAdd} onClick={handleAddPlantToList}>Add<AddIcon /></Button></Box>}
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            {
                                quantityArray.map((info, index) => (
                                    <PlantDetails plantInfo={info}
                                        listIndex ={index}
                                        handleSavePlant={handleSavePlant}
                                        handleDeletePlantFromList={handleDeletePlantFromList}
                                        key={nanoid()}
                                    />))
                            }
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