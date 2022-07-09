import React from 'react';
import { Card, Typography, CardContent, CardMedia, Box, FormControl, InputLabel, Select, MenuItem, CardActions, Input, Button} from '@mui/material';
import plantCategories from '../../../lists/plantCategories';
import sizes from '../../../constants/sizes';
import statuses from '../../../constants/status';
const EditContent = ({ plant, plantInfo, formHasAllRequiredFields, inputOfNumberValid, handleSaveEdit, handleEditMode, handleInputChange}) => {

    return (
        <>
        <CardContent>
            <>
                <input type="file" id="file" style={{ display: 'none' }} />
                <CardMedia component="img" height="200" image={`${plant?.selectedFiles[0].base64}`} />
            </>
            <Box>
                {!formHasAllRequiredFields && <Typography color="error">* All fields and images are required.</Typography>}
                {!inputOfNumberValid && <Typography color="error">* Quantity or Price is not a valid number.</Typography>}
            </Box>
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="name">Name</InputLabel>
                    <Input name='name' type="text" id="name" value={plantInfo?.name} sx={{ display: 'block' }} placeholder={`Name: ${plant?.name}`} onChange={handleInputChange}></Input>
                </FormControl>
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="category">Category</InputLabel>
                        <Select label="Category" name="category" id="category" value={plantInfo?.category} sx={{ color: 'black' }} onChange={handleInputChange}>
                            <MenuItem value=""> -- </MenuItem>
                            {plantCategories.map(category => <MenuItem key={plantCategories.indexOf(category)} value={category}>{category}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="size">Size</InputLabel>
                        <Select label="Size" name="size" id="size" value={plantInfo?.size} onChange={handleInputChange}>
                            <MenuItem value=""> -- </MenuItem>
                            {sizes.map(size => <MenuItem key={sizes.indexOf(size)} value={size}>{size}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="status">Quantity</InputLabel>
                            <Input name='quantity' type="number" id="price" value={plantInfo?.quantity} sx={{ display: 'block' }} placeholder={`Price: $${plantInfo?.quantity}`} onChange={handleInputChange}></Input>
                    </FormControl>
                </Box>
                <FormControl fullWidth>
                    <InputLabel id="price">Price</InputLabel>
                    <Input name='price' type="number" id="price" value={plantInfo?.price} sx={{ display: 'block' }} placeholder={`Price: $${plantInfo?.price}`} onChange={handleInputChange}></Input>
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