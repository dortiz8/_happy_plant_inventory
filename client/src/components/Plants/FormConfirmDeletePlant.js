import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const FormConfirmDeletePlant = ({ handleDeletePlant, setFormConfirmDeleteVisible }) => {
    function handleDelete() {
        handleDeletePlant();
        setFormConfirmDelete(false)
    }
    return (
        <Box sx={{ backgroundColor: '#DFF0DA' }}>
            <Box>
                <Typography variant='h6' textAlign='center'>Are you sure you want to clear? All information will be lost.</Typography>
            </Box>
            <Box textAlign='center'>
                <Button variant="contained" size="small" onClick={handleDelete}>Delete</Button>
                <Button variant="contained" color="error" size="small" onClick={() => setFormConfirmDeleteVisible(false)}>Go Back</Button>
            </Box>
        </Box>
    )
};

export default FormConfirmDeletePlant;