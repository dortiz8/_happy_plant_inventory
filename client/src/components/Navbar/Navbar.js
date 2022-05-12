import React from 'react';
// Page Route Components
import { Link, useHistory, useLocation } from 'react-router-dom';
// import material ui components
import { Typography, AppBar, Toolbar, Container, Box, Button, Menu, MenuItem } from '@mui/material';
// import constants
import {pages} from '../../constants/pageConstants.js'; 
const Navbar = () => {
    function handleCloseNavMenu(){

    }; 
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex'} }}>
                        {pages.map((page) => (
                            <Button key={pages.indexOf(page)}>
                                <Link 
                                    to={`/${page}`} 
                                    replace
                                    >{page}</Link>
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar;