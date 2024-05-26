import { userData } from '@/constants/userData'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import StarHalfIcon from '@mui/icons-material/StarHalf';

const Footer = () => {
    return (
        <Box sx={{
            position: 'relative',
            py: 2,
            px: '100px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Box sx={{
                width: '100%',
                height: '2px',
                backgroundImage: 'linear-gradient(45deg, #000, #7d5ba2,#000)',
                position: 'absolute',
                left: 0,
                top: 0
            }} />
            <Box sx={{
                width: 'fit-content',
                display: 'flex',
                // columnGap: '2px',
                alignItems: 'center'
            }}>
                <Typography variant='subtitle1' sx={{ textAlign: 'center', fontFamily: 'Cascadia Code', color: 'text.primary' }}>
                    © GitHub Portfolio by &nbsp;

                </Typography>
                <Link href={userData.linkedIn} target='_blank' style={{
                    textDecoration: 'none'
                }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            textAlign: 'center',
                            fontFamily: 'Cascadia Code',
                            color: '#7d5ba2',
                            position: 'relative',
                            textTransform: 'none',
                            transition: 'color 300ms, transform 300ms',
                            '&:hover': {
                                color: 'text.primary',
                                textTransform: 'uppercase',
                            },
                        }}>
                        Amit Rana
                    </Typography>
                </Link>
            </Box>
            <Box>
                <Box sx={{
                    display: 'flex',
                    columnGap: '12px',
                    alignItems: 'center',
                }}>
                    <Link href={'https://github.com/HUMBLEF0OL/portfolio'} target='_blank'>
                        <StarHalfIcon sx={{ width: '25px', height: '25px', color: '#7d5ba2' }} />
                    </Link>
                    <Link href={'https://github.com/HUMBLEF0OL/portfolio/fork'} target='_blank'>
                        <svg fill="#7d5ba2" strokeWidth="0" viewBox="0 0 448 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M80 104a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm80-24c0 32.8-19.7 61-48 73.3V192c0 17.7 14.3 32 32 32H304c17.7 0 32-14.3 32-32V153.3C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V192c0 53-43 96-96 96H256v70.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V288H144c-53 0-96-43-96-96V153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm208 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48zM248 432a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z"></path></svg>
                    </Link>

                </Box>
            </Box>
        </Box >
    )
}

export default Footer