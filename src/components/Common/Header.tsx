"use client"
import { AppBar, Box, Container, MenuItem, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const routes = ['home', 'about', 'resume', 'portfolio'] as const;
type Routes = typeof routes[number];

const Header = () => {
    const [currentRoute, setCurrentRoute] = useState<Routes>('home')

    useEffect(() => {
        console.log(currentRoute);
    }, [currentRoute])
    const handleMenuSelection = (newPage: Routes) => {
        setCurrentRoute(newPage)
    };
    return (
        <AppBar position="fixed" sx={{
            left: 0,
            top: 0,
            maxWidth: '550px',
            display: { md: 'block', xs: 'none', sm: 'none' },
            backdropFilter: 'blur(10px)',
            backgroundColor: 'background.secondary',
            mx: 'auto'
        }}
        >
            <Container sx={{ width: '100%' }}>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
                        {routes.map((page) => (
                            <MenuItem
                                key={page}
                                onClick={() => { handleMenuSelection(page) }}
                            >
                                <Typography textAlign="center">{page.toUpperCase()}</Typography>
                            </MenuItem>
                        ))}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header