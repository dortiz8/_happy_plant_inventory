import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, ListItem} from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';

const PlantListItem = ({ plant, OpenFormConfirmDelete }) => {
    
    return (
       <ListItem>
            <Typography sx={{marginRight: '5px'}}>{plant.name}</Typography>
            <Typography variant="caption">{plant.category}</Typography>
            <Button><Link to={`/plant-details/${plant._id}`} replace><PreviewIcon /></Link></Button>
       </ListItem>
    )
}

export default PlantListItem;