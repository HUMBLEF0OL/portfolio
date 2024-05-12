"use client"
import { TXT_COL_HIGH, TXT_COL_PRI } from '@/constants/colorConstants';
import { AppBar, Box, Button, ButtonBase, Container, Link, MenuItem, Toolbar, Typography } from '@mui/material'
// import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const routes = ['Stats', 'Projects', 'Contribution'] as const;
type Routes = typeof routes[number];

const Header = () => {
    const [currentRoute, setCurrentRoute] = useState<Routes | undefined>()

    useEffect(() => {
        console.log(currentRoute);
    }, [currentRoute])
    const handleMenuSelection = (newPage: Routes) => {
        // setCurrentRoute(newPage)
    };
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
                        <ButtonBase component={Link} href={'#'} sx={{
                            fontFamily: 'Fira Code',
                            color: TXT_COL_PRI,
                            fontSize: '20px',
                            textDecoration: 'none',
                            transition: ' color 300ms',
                            '&:hover': {
                                color: TXT_COL_HIGH
                            }
                        }}>
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
                                    {/* <Typography textAlign="center">{page.toUpperCase()}</Typography> */}
                                    <Link href={`#${page.toLowerCase()}`}>{page.toUpperCase()}</Link>
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