import React from 'react';
import { Button, Typography, Box, List, ListItem } from '@mui/material';

const FormConfirmAddPlant = ({ plantInfo, quantityArray, setFormConfirmVisible, handleSubmit}) => {
    
    return (
        <Box sx={{ backgroundColor: '#DFF0DA'}}>
            <Box>
                <Typography variant='h6' textAlign='center'>Please confirm to add your new plant.</Typography>
            </Box>
            <Box sx={{ backgroundColor: 'whitesmoke'}}>
                <Box margin='20px 10px'>
                    <Typography><b>Name: </b>{plantInfo.name}</Typography>
                    <Typography><b>Category: </b>{plantInfo.category}</Typography>
                </Box>
                <Box sx={{margin: '0 10px'}}>
                    {quantityArray.map((details) =>(
                        <>
                            <Box sx={{ margin: '0 10px', padding: '5px', border: '1px solid black', height: '200px' }}>
                                <Typography><b>Description:</b> {details.description}</Typography>
                                <Typography><b>Price:</b>Price: ${details.price}</Typography>
                                <Typography><b>Cut: </b>{details.type}</Typography>
                                <Box>
                                    <Typography><b>Images</b></Typography>
                                    <List>
                                        {details.selectedFiles.map(file => <ListItem key={details.selectedFiles.indexOf(file)}>
                                            <Typography variant="subtitle2">{`${file.name.slice(0, 10)}...${file.name.slice(file.name.length - 4, file.name.length)}`}</Typography>
                                        </ListItem>)}
                                    </List>
                                </Box>
                            </Box>
                        </>
                    ))}
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