import React from 'react';
import { Card, Typography, CardContent, CardMedia, Box, FormControl, InputLabel, Select, MenuItem, CardActions, Input, Button} from '@mui/material';
import typeList from '../../../lists/plantTypeList';
import EditIcon from '@mui/icons-material/Edit';
import sizes from '../../../constants/sizes';
import statuses from '../../../constants/status';

const EditContent = ({ plant, plantInfo, formHasAllRequiredFields, inputOfNumberValid, handleSaveEdit, handleEditMode, handleInputChange, handleFileSelection}) => {
    console.log(plant, plantInfo)
    return (
        <>
        <CardContent>
            <>
                <CardMedia component="img" height="200" image={`${plant?.selectedFiles[0].base64}`} />
                
                <input name="selectedFiles" 
                       id="file" 
                       type="file" 
                       style={{ display: 'none' }} 
                       onChange={handleFileSelection} />
                <label htmlFor="file">
                    <Button>
                        <EditIcon />
                    </Button>
                </label>
            </>
            <Box>
                {!formHasAllRequiredFields && <Typography color="error">* All fields and images are required.</Typography>}
                {!inputOfNumberValid && <Typography color="error">* Price is not a valid number.</Typography>}
            </Box>
            <Box>
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="category">type</InputLabel>
                        <Select label="Type" name="type" id="type" value={plantInfo?.type} sx={{ color: 'black' }} onChange={handleInputChange}>
                            <MenuItem value=""> -- </MenuItem>
                                {typeList.map(genus => <MenuItem key={typeList.indexOf(genus)} value={genus}>{genus}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="description">Description</InputLabel>
                        <Input name='description' type="text" id="description" value={plantInfo?.description} sx={{ display: 'block' }} placeholder={plantInfo?.description.toString()} onChange={handleInputChange}></Input>
                    </FormControl>
                </Box>
                <FormControl fullWidth>
                    <InputLabel id="price">Price</InputLabel>
                    <Input name='price' type="number" id="price" value={plantInfo?.price} sx={{ display: 'block' }} placeholder={plantInfo?.price.toString()} onChange={handleInputChange}></Input>
                </FormControl>
            </Box>
        </CardContent>
        <CardActions>
                <Button onClick={handleSaveEdit}>Save</Button>
                <Button color="warning" onClick={handleEditMode}>Cancel</Button>
        </CardActions>
        </>
    )
}

export default EditContent;