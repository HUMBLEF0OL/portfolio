"use client"
import { Box } from '@mui/material'
import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import GitHubCalendar from 'react-github-calendar'

const Contributions = () => {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '40px',
            px: '40px',
            pt: '100px'
        }}>
            <SectionTitle title={'Activity Graph'} />
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <GitHubCalendar
                    username="humblef0ol"
                    blockSize={14}
                />

            </Box>

        </Box>
    )
}

export default Contributions