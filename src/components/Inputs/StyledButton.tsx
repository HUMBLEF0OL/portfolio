import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import React, { ReactNode } from 'react'

const StyledButton: React.FC<{ text: string, url: string, icon: ReactNode }> = ({ text, url, icon }) => {
    return (
        <Button
            component={Link}
            href={url}
            sx={{
                display: 'flex',
                columnGap: '4px',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px solid transparent',
                borderImage: 'linear-gradient(to right, #f43cb3, #8b17e7, #2400ff) 1',
                transition: 'border-image 300ms, column-gap 300ms',
                '&:hover': {
                    borderImage: 'linear-gradient(to left, #f43cb3, #8b17e7, #2400ff) 1',
                    columnGap: '10px'
                },
                color: 'white',
                padding: '10px 20px',
                cursor: 'pointer',
                overflow: 'hidden',
                fontWeight: 600

            }}>
            {text.toUpperCase()}
            {icon}
        </Button>
    )
}

export default StyledButton
