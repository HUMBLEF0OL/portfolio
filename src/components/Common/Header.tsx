"use client"
import { AppBar, Box, ButtonBase, Container, Link, MenuItem, Toolbar } from '@mui/material'
// import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const routes = ['stats', 'streak & rank', 'projects'] as const;
type Routes = typeof routes[number];

const Header = () => {
    const [currentRoute, setCurrentRoute] = useState<Routes | undefined>()

    useEffect(() => {
        console.log(currentRoute);
    }, [currentRoute])
    const handleMenuSelection = (newPage: Routes) => {
        // setCurrentRoute(newPage)
    };

    const logoSx = {
        fontFamily: 'Fira Code',
        color: '#7d5ba2',
        fontSize: '20px',
        textDecoration: 'none',
        letterSpacing: '1.25px',
        fontWeight: 500,
        position: 'relative',
        px: '12px',
        '&:before': {
            content: '""',
            position: 'absolute',
            height: 0,
            width: '2px',
            left: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(45deg, #000, #7d5ba2)',

            transition: 'height 300ms',
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: '2px',
            width: 0,
            backgroundImage: 'linear-gradient(45deg, #000, #7d5ba2)',
            transition: 'width 300ms'
        },
        transition: ' color 300ms',
        '&:hover': {
            color: '#fff',
            '&:before': {
                height: '100%'
            },
            '&:after': {
                width: '100%'
            }
        }
    }

    const menuItemSx = {
        color: '#fff',
        fontSize: '16px',
        letterSpacing: '1.25px',
        textDecoration: 'none',
        '&:after': {
            content: "''",
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: '2px',
            width: '0%',
            backgroundColor: 'white',
            transition: 'width 0.4s ease'
        },
        transition: ' color 400ms',
        '&:hover': {
            color: '#7d5ba2',
            '&:after': {
                width: '100%',
            }
        }
    }

    return (
        <AppBar position="fixed" sx={{
            left: 0,
            top: 0,
            width: '100%',
            display: { md: 'block', xs: 'none', sm: 'none' },
            backdropFilter: 'blur(10px)',
            backgroundColor: 'transparent',
            mx: 'auto',
            height: '60px'
        }}
        >
            <Container sx={{ width: '100%' }}>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
                        <ButtonBase component={Link} href={'#'} sx={logoSx}>
                            HUMBLEF0OL
                        </ButtonBase>

                        <Box sx={{
                            flexGrow: 1, flexDirection: 'row', justifyContent: 'flex-end', display: 'flex'
                        }}>
                            {routes.map((page) => (
                                <MenuItem
                                    key={page}
                                // onClick={() => { handleMenuSelection(page) }}
                                >
                                    <Link href={`#${page.toLowerCase()}`} style={{
                                        textDecoration: 'none',
                                        position: 'relative'
                                    }}>
                                        <Box sx={menuItemSx}>
                                            {page.toUpperCase()}
                                        </Box>

                                    </Link>
                                </MenuItem>
                            ))}
                        </Box>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header