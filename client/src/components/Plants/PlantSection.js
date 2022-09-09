import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, ListItem, Badge, Box, Paper} from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import PlantListItem from './PlantListItem';

const PlantSection = ({ plantSection }) => {

    return (
        <Paper sx={{ padding: '1rem .5rem', marginBottom: '1rem', backgroundColor: '#383838', color: 'white'}}>
            <Box sx={{ textAlign: 'center'}} >
                <Typography variant="body1">Group: {plantSection.name}</Typography>
                <Typography variant="caption" variant="h6">{plantSection.category}</Typography>
            </Box>
            {
                plantSection.multiple && (
                    plantSection.multiple.map(plant => <PlantListItem plant={plant} sectionId={plantSection._id} />)
                )
            }
       </Paper>
    )
}

export default PlantSection;