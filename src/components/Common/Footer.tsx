import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <Box sx={{
            position: 'relative',
            p: 1
        }}>
            <Box sx={{
                width: '100%',
                height: '2px',
                backgroundImage: 'linear-gradient(45deg, #000, #7d5ba2,#000)',
                position: 'absolute',
                left: 0,
                top: 0
            }} />
            <Typography variant='subtitle1' sx={{ textAlign: 'center', fontFamily: 'Cascadia Code', color: 'text.primary' }}>
                © HUMBLEFOOL 2024 | All Rights Reserved | Designed and Developed with ❤️
            </Typography>
        </Box >
    )
}

export default Footer