import React from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, Typography, CardMedia, CardContent, CardActions, Box } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import PostAddIcon from '@mui/icons-material/PostAdd';
const PresentationContent = ({ plant, handleEditMode, setFormConfirmDeleteVisible, handleResetState}) => {

    return (
        <>
        <CardContent>
            <CardMedia component="img" height="200" image={`${plant?.selectedFiles[0].base64}`} />
            <Typography><b>Type: </b>{plant?.type}</Typography>
            <Typography><b>Price: </b>${plant?.price}</Typography>
            <Typography><b>Description: </b>{plant?.description}</Typography>
        </CardContent>
        <CardActions>
            <Box>
                <Link to="/plants" replace><ArrowLeftIcon /></Link>
                <Button onClick={handleEditMode}>
                    <EditIcon />
                </Button>
                <Button color="warning" onClick={() => setFormConfirmDeleteVisible(true)}><DeleteForeverIcon /></Button>
                <Button ><PostAddIcon /></Button>
            </Box>
        </CardActions>
        </>
    )
}

export default PresentationContent;