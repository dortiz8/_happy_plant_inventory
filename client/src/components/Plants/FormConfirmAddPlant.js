import React from 'react';
import { Button, Typography, Box, List, ListItem } from '@mui/material';

const FormConfirmAddPlant = ({ plantInfo, setFormConfirmVisible, handleSubmit}) => {
    
    return (
        <Box sx={{ backgroundColor: '#DFF0DA'}}>
            <Box>
                <Typography variant='h6' textAlign='center'>Please confirm to add your new plant.</Typography>
            </Box>
            <Box sx={{ backgroundColor: 'whitesmoke'}}>
                <Box margin='5px'>
                    <Typography><b>Name: </b>{plantInfo.name}</Typography>
                    <Typography><b>Category: </b>{plantInfo.category}</Typography>
                    <Typography><b>Qty: </b>{plantInfo.quantity}</Typography>
                    <Typography><b>Size: </b>{plantInfo.size}</Typography>
                    <Typography><b>Description: </b>{plantInfo.description}</Typography>
                    <Typography><b>Price: </b>${plantInfo.price}</Typography>
                    <Box>
                        <Typography><b>Images</b></Typography>
                        <List>
                            {plantInfo.selectedFiles.map(file => <ListItem key={plantInfo.selectedFiles.indexOf(file)}>
                                <Typography variant="subtitle2">{`${file.name.slice(0, 10)}...${file.name.slice(file.name.length - 4, file.name.length)}`}</Typography>
                                </ListItem>)}
                        </List>
                    </Box>
                </Box>
                <Box textAlign='center'>
                    <Button variant="contained" size="small"  onClick={handleSubmit}>Confirm</Button>
                    <Button variant="contained" color="error" size="small" onClick={() => setFormConfirmVisible(false)}>Edit</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default FormConfirmAddPlant;