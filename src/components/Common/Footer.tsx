import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <Box sx={{
            bottom: 0,
            left: 0
        }}>
            <Typography sx={{ textAlign: 'center' }}>

                © HUMBLEFOOL 2024 | All Rights Reserved | Designed and Developed with ❤️
            </Typography>
        </Box >
    )
}

export default Footer