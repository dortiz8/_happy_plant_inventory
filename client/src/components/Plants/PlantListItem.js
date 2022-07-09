import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, ListItem, Badge, Box} from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';

const PlantListItem = ({ plant }) => {
    
    return (
       <ListItem >
            <Box sx={{width: '100%'}}>
                <Typography sx={{ marginRight: '5px' }}>{plant.name}</Typography>
                <Typography variant="caption">{plant.category}</Typography>
                <Button><Link to={`/plant-details/${plant._id}`} replace><PreviewIcon /></Link></Button>
            </Box>
            <Badge badgeContent={plant.quantity} color="success" ></Badge>
       </ListItem>
    )
}

export default PlantListItem;