import React from 'react';
import { Button, Typography, Box} from '@mui/material';

const FormConfirmClear = ({ handleClearForm, setFormConfirmClearVisible}) => {
    console.log('confirmClear')
    function handleClear(){
        handleClearForm(); 
        setFormConfirmClearVisible(false)
    }
    return (
        <Box sx={{ backgroundColor: '#DFF0DA' }}>
            <Box>
                <Typography variant='h6' textAlign='center'>Are you sure you want to clear? All information will be lost.</Typography>
            </Box>
            <Box textAlign='center'>
                <Button variant="contained" size="small" onClick={handleClear}>Clear</Button>
                <Button variant="contained" color="error" size="small" onClick={() => setFormConfirmClearVisible(false)}>Go Back</Button>
            </Box>
        </Box>
    )
}; 

export default FormConfirmClear;