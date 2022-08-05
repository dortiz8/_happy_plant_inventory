import React from 'react';
import { Typography, Box, Button} from '@mui/material';

export default function WarningMessage({message, handleYes, handleNo}) {
    return (
        <Box>
            <Typography>{message}</Typography>
            <Box>
                <Button onClick={handleYes}>Yes</Button>
                <Button onClick={handleNo}>No</Button>
            </Box>
        </Box>
    )
}