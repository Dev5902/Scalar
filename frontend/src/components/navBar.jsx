import React from "react";

import {AppBar,Typography,Toolbar,Container} from "@mui/material"

const Header = () =>{
    return (
    <AppBar position="static">
        <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: {  md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Dr. Singh
          </Typography>
          <Typography 
          variant="h6"
          noWrap
          component="a"
          href="/view"
          sx={{
            mr: 2,
              display: {  md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
          }}
          >
            View
          </Typography>
        </Toolbar>
        </Container>
    </AppBar>
    );
}

export default Header;