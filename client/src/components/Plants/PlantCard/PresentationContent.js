import React from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, Typography, CardMedia, CardContent, CardActions, Box } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
const PresentationContent = ({ plant, handleEditMode, setFormConfirmDeleteVisible, handleResetState}) => {

    return (
        <>
        <CardContent>
            <CardMedia component="img" height="200" image={`${plant?.selectedFiles[0].base64}`} />
            <Typography variant='h4'>{plant?.name}</Typography>
            <Typography><b>Category: </b>{plant?.category}</Typography>
            <Typography><b>Size: </b>{plant?.size}</Typography>
            <Typography><b>Status: </b>{plant?.status}</Typography>
            <Typography><b>Price: </b>${plant?.price}</Typography>
        </CardContent>
        <CardActions>
            <Box>
                <Link to="/plants" replace><ArrowLeftIcon /></Link>
                <Button onClick={handleEditMode}>
                    <EditIcon />
                </Button>
                <Button color="warning" onClick={() => setFormConfirmDeleteVisible(true)}><DeleteForeverIcon /></Button>
            </Box>
        </CardActions>
        </>
    )
}

export default PresentationContent;