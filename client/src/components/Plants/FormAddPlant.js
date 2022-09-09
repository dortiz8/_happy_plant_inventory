import React from 'react';
import {useState, useEffect} from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
// Redux store functions
import { createNewPlant} from '../../store/plantsSlice';
// Material UI Section 
import { Button, Typography, Paper, Box, Input, InputLabel, Select, MenuItem,Radio, FormControl, FormLabel, RadioGroup, FormControlLabel} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
// Component Imports
import FormConfirmAddPlant from './FormConfirmAddPlant'; 
import FormConfirmClear from './FormConfirmClear';
// Other imports 
import genusList from '../../lists/genusList';

import { useNavigate } from 'react-router';
import { PlantObjectValidator } from '../../services/validation';
import GeneralPlantInfo from '../../models/generalPlantInfo';

import PlantDetails from './PlantSpecifics/PlantDetails';
import PlantSpecifics from '../../models/plantSpecifics';
import {nanoid} from 'nanoid'; 
import WarningMessage from '../Common/WarningMessage';

const FormAddPlant = (e) => {
    // Local Storage variables
    let localStorageData = JSON.parse(localStorage.getItem('plantInfo')) || new GeneralPlantInfo("", "");
    let localStorageQuantityArray = JSON.parse(localStorage.getItem('quantityArray')) || []; 
    let localStoragePlantIndex = JSON.parse(localStorage.getItem('plantIndex')) || 1; 

    // Component State
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

    // Dispatch
    const dispatch = useDispatch()

    // Navigation 
    const navigate = useNavigate()
    
    // Set one default plant card if the array of plants is empty. This allows the user to 
    // start off with one object when visiting this page. 
    useEffect(()=>{
        if(!quantityArray.length){
            let arr = []; 
            arr.push(new PlantSpecifics("", 0, "", [], 0))
            setQuantityArray(arr); 
        }else{
            if(validateQuantityArray()){
                setDisableAdd(false); 
            }else{
                setDisableAdd(true);
            }
        }
    },[quantityArray]); 

    // Constantly saving relevant state into local storage in case the user navigates away from the page
    useEffect(()=>{
        localStorage.setItem('plantInfo', JSON.stringify(plantInfo))
        localStorage.setItem('quantityArray', JSON.stringify(quantityArray));
        localStorage.setItem('plantIndex', JSON.stringify(plantIndex));
    }, [plantInfo, quantityArray, plantIndex])

    // Handlers and Actions 
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
            if(quantityArray.length > 1) setShowWarningMessage(true)
            if(quantityArray.length === 1) setMultiple(false); 
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
        if (validatePlantObject() && validateQuantityArray(true)){
            setFormConfirmVisible(true); 
        }
    }
    function handleSubmit(e){

        e.preventDefault(); 
        // Add quantity array to our plant object
        plantInfo.multiple = quantityArray; 
        dispatch(createNewPlant(plantInfo));
        setFormConfirmVisible(false); 
        localStorage.removeItem('plantInfo'); 
        localStorage.removeItem('quantityArray'); 
        localStorage.removeItem('plantIndex'); 
        navigate('/plants', {replace: true})
    }

    function handleClearForm(){
        let blankPlantObject = new GeneralPlantInfo("", "")
        setPlantInfo(blankPlantObject)
    }

    // Form Validation 
    function validateQuantityArray(showMessage = false){
        let result = true; 
        for (let i = 0; i < quantityArray.length; i++) {
            const details = quantityArray[i];
            if(!details.saved){
                if(showMessage) setisQuantityArrayValid(false); 
                return false; 
            }
        }
        setisQuantityArrayValid(true); 
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
                        {!formHasAllRequiredFields && <Typography color="error">* Name and genus are required.</Typography>}
                        {!isQuantityArrayValid && <Typography color="error">* Please save all plants. You can discard if necessary.</Typography>}
                    </Box>
                    <Box sx={{backgroundColor: '#FAFAFA', margin: '1rem 0'}}>
                        <Box>
                            <InputLabel>Name</InputLabel>
                            <Input name="name" type="text" value={plantInfo.name} onChange={handleInputChange}></Input>
                        </Box>
                        <Box>
                            <InputLabel>Genus</InputLabel>
                            <Select label="Genus" name="genus" value={plantInfo.genus ? plantInfo.genus : ''} onChange={handleInputChange}>
                                <MenuItem value=""> -- </MenuItem>
                                {
                                    genusList.map(genus => <MenuItem key={genusList.indexOf(genus)} value={genus}>{genus}</MenuItem>)
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