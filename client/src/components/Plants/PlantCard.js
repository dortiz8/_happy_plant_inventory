import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams, useNavigate} from 'react-router-dom';
// Redux store functions
import { deletePlant, editPlant} from '../../store/plantsSlice';
import {fetchPlant, SelectSinglePlant, getPlantStatus, getPlantError, resetState, getPlantParentName} from '../../store/plantSlice'; 
// Meterial UI Section
import { Card, Box, Typography} from '@mui/material';

// Other Imports 
import FormConfirmDelete from './FormConfirmDelete';
import { PlantObjectValidator } from '../../services/validation';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import EditContent from './PlantCard/EditContent';
import PresentationContent from './PlantCard/PresentationContent';
import { setFileSelection } from '../../services/fileSelection';

const PlantCard = () => { 
    const { sectionId, id } = useParams();
    const plant = useSelector(SelectSinglePlant); 
    const plantParentName = useSelector(getPlantParentName); 
    const plantStatus = useSelector(getPlantStatus); 
    const plantError = useSelector(getPlantError); 
    const [plantInfo, setPlantInfo] = useState({});
    const [editMode, setEditMode] = useState(false); 
    const [formConfirmDeleteVisible, setFormConfirmDeleteVisible] = useState(false); 
    const [formHasAllRequiredFields, setFormHasAllRequiredFields] = useState(true);
    const [inputOfNumberValid, setInputOfNumberValid] = useState(true);
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
    console.log(plant)
    useEffect(() => {
        if(plantStatus == 'idle'){
            dispatch(fetchPlant(id))
        }
        
    }, [plantStatus, id, dispatch]); 
    useEffect(()=>{
        setPlantInfo(plant)
    }, [plant]); 

    useEffect(()=>{
        return () =>{
            dispatch(resetState()); 
        }
    }, [])
    let content; 

    if(plantStatus == 'loading'){
        content = <LoadingSpinner />
    } else if(plantStatus == 'succeeded'){
        content = <PresentationContent plant={plant} handleEditMode={handleEditMode} setFormConfirmDeleteVisible={setFormConfirmDeleteVisible}/>
    } else if(plantStatus == 'failed'){
        content = <ErrorMessage /> 
    }

    function handleInputChange(event){
        let newObj = {};
        if (!isNaN(parseInt(event.target.value))) {
            newObj[event.target.name] = parseInt(event.target.value);
        } else {
            newObj[event.target.name] = event.target.value;
        }
        setPlantInfo({
            ...plantInfo,
            ...newObj
        })
    }
    function handleFileSelection(event){
        console.log('clicked file')
        setFileSelection(event, plantInfo, setPlantInfo); 
    }
    function handleEditMode(){
        setEditMode(!editMode);  
    }; 

    function handleSaveEdit(){
        let PlantValidator = new PlantObjectValidator(plantInfo)
        let result = PlantValidator.validatePlantDetailsObject(); 
        setFormHasAllRequiredFields(PlantValidator.hasAllRequiredFields);
        setInputOfNumberValid(PlantValidator.inputNumberIsValid);
        if(result){
            console.log('success ---->', plantInfo)
            // dispatch(editPlant(plantInfo));
            // navigate('/plants', {replace: true}); 
        } 
    }; 

    function handleDeleteItem(){
        //console.log(sectionId, ' parent---->', id, ' childid --> ')
        let idInfoObject = {sectionId: sectionId, id: id}
        dispatch(deletePlant(idInfoObject));
        navigate('/plants', {replace: true}); 
    }; 
    
    return (
            <Box>
            {formConfirmDeleteVisible && <FormConfirmDelete handleDeleteItem={handleDeleteItem} setFormConfirmDeleteVisible={setFormConfirmDeleteVisible} /> }
                <Card sx={{ margin: "10px" }}>
                <Typography variant="h5">{plantParentName}</Typography>
                    {editMode ? (
                    <EditContent plant={plant} plantInfo={plantInfo}
                              formHasAllRequiredFields={formHasAllRequiredFields}
                              inputOfNumberValid={inputOfNumberValid} 
                              handleSaveEdit={handleSaveEdit}
                              handleEditMode={handleEditMode}
                              handleInputChange={handleInputChange}
                              handleFileSelection={handleFileSelection}
                              />
                    ) : (
                        content
                    )}
                </Card>
            </Box>
           
        
      
    )
}

export default PlantCard;