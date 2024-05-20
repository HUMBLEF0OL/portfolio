import { Box, Typography } from '@mui/material'
import React from 'react'

const SectionTitle: React.FC<{ title: string }> = ({ title }) => {
    return (
        <Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box sx={{
                    backgroundImage: 'linear-gradient(45deg, #000, #7d5ba2)',
                    flex: 1,
                    height: "2px",
                }} />
                <Typography
                    variant='h3'
                    sx={{
                        backgroundColor: '#7d5ba2',
                        px: '20px',
                        py: '15px',
                        width: 'fit-content',
                        borderRadius: '5px',
                        fontWeight: 600,
                        letterSpacing: 2.25,
                        color: '#fff',
                        transition: 'color 500ms',
                        '&:hover': {
                            // backgroundColor: '#000',
                            color: "#000"
                        }
                    }}>
                    {title?.toUpperCase()}
                </Typography>
                <Box sx={{ backgroundImage: 'linear-gradient(45deg, #7d5ba2, #000)', flex: 1, height: "2px" }} />

            </Box>
        </Box>
    )
}

export default SectionTitle