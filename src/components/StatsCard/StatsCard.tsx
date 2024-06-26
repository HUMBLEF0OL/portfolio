import { Box } from '@mui/material'
import React, { ReactNode } from 'react'

const StatsCard: React.FC<{ children: ReactNode, isLink: Boolean }> = ({ children, isLink }) => {
    return (
        <Box sx={{
            borderRadius: '10px',
            py: '20px',
            backgroundColor: '#1a1b27',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            border: '2px solid #1a1b27',
            transition: 'box-shadow 300ms',
            boxShadow: '0 0 10px 2px #1a1b27',
            '&:hover': {
                borderImage: isLink ? 'linear-gradient(to right, #1a1b27, #8b17e7, #1a1b27) 1' : 'none',
                boxShadow: '0 0 10px 2px #573978',
            },
            height: '100%'
        }}>
            {children}

        </Box>
    )
}

export default StatsCard