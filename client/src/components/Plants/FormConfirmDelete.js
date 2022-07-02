import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const FormConfirmDelete = ({ handleDeleteItem, setFormConfirmDeleteVisible }) => {
    console.log('confirmClear')
    function handleDelete() {
        handleDeleteItem();
        setFormConfirmDeleteVisible(false)
    }
    return (
        <Box sx={{ backgroundColor: '#DFF0DA' }}>
            <Box>
                <Typography variant='h6' textAlign='center'>Please confirm deletion.</Typography>
            </Box>
            <Box textAlign='center'>
                <Button variant="contained" size="small" onClick={handleDelete}>Delete</Button>
                <Button variant="contained" color="error" size="small" onClick={() => setFormConfirmDeleteVisible(false)}>Cancel</Button>
            </Box>
        </Box>
    )
};

export default FormConfirmDelete;