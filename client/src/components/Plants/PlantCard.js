import React from 'react';
import { Button, Typography, Card, CardHeader, CardMedia} from '@mui/material';
const PlantCard = ({plant}) => {  
    console.log(plant)
    return (
       <Card>
            <CardMedia component="img" height="194" image={`${plant.selectedFiles[0].base64}`}/>
            <Typography>{plant.name}</Typography>
       </Card>
    )
}

export default PlantCard;