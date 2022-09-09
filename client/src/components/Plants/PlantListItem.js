import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, ListItem, Badge, Box, Card, CardHeader, CardActionArea, CardActions, CardContent, CardMedia} from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
const PlantListItem = ({ plant, sectionId }) => {
    
    return (
       <ListItem >
            <Card sx={{width: '100%'}}>
                <CardActions>
                    <Button> <Link to={`/plant-details/${sectionId}/${plant._id}`}><ModeEditOutlineTwoToneIcon /></Link></Button>
                </CardActions>
                <CardHeader
                title={plant.type}
                subheader={`$${plant.price}`}>
                </CardHeader>
                <CardMedia
                    component="img"
                    height="194"
                    image={`${plant.selectedFiles[0].base64}`}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">{plant.description}</Typography>
                </CardContent>
                
            </Card>
       </ListItem>
    )
}

export default PlantListItem;