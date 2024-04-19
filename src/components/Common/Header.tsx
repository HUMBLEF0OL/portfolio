import { Box, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
    return (
        <Box
            sx={{
                height: '100%'
            }}
        >
            <Typography variant="h4" align="center" color={'text.secondary'}>
                Header
            </Typography>
        </Box>
    )
}

export default Header