import React from 'react';
import { Button, Typography, ListItem} from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const PlantListItem = ({ plant }) => {
    return (
       <ListItem>
           <Typography>{plant.name}</Typography>
           <Button onClick={OpenPlantDetails}><PreviewIcon /></Button>
            <Button><EditIcon /></Button>
            <Button><DeleteForeverIcon /></Button>
       </ListItem>
    )
}

export default PlantListItem;