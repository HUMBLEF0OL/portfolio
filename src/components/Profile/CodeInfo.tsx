import { BACKGROUND_PRI } from '@/constants/colorConstants'
import { userData } from '@/constants/userData'
import { Box, Typography } from '@mui/material'
import React from 'react'

const CodeInfo = ({ profileData }: { profileData: any }) => {
    const spanSx = {
        fontSize: '14px',
        fontFamily: 'inherit'
    }
    const typographySx = {
        fontFamily: 'Fira Code',
        fontSize: '14px'
    }
    return (
        <Box sx={{
            backgroundColor: BACKGROUND_PRI,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px'
        }}>
            <Box sx={{
                display: 'flex',
                columnGap: '8px',
                alignItems: 'center',
                px: '16px',
                py: '4px',
                height: '52px'

            }}>
                <Box sx={{
                    height: '12px',
                    width: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#ef4444',
                }} />
                <Box sx={{
                    height: '12px',
                    width: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#fb923c',
                }} />

                <Box sx={{
                    height: '12px',
                    width: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#4ade80',
                }} />

            </Box>

            <Box sx={{
                flex: 1,
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                p: '32px',
                backgroundColor: '#000000'

            }}>
                <Typography sx={{ ...typographySx }}>
                    const <Typography component="span" sx={{ color: '#ff1744', ...typographySx }}>coder</Typography>
                    <Typography component="span" sx={{ color: '#00e676', ...spanSx }}>=</Typography>
                    <Typography component="span" sx={{ color: '#2979ff', ...spanSx }}>{'{'}</Typography>
                </Typography>
                <Typography sx={{ ...typographySx }}>
                    <Typography component="span" sx={{ color: '#fff', ...spanSx, ml: 2 }}>name:</Typography>
                    <Typography component="span" sx={{ color: '#9ca3af', ...spanSx }}>'</Typography>
                    <Typography component="span" sx={{ color: '#10b981', ...spanSx }}>{profileData.name}</Typography>
                    <Typography component="span" sx={{ color: '#9ca3af', ...spanSx }}>',</Typography>
                </Typography>

                <Typography sx={{ ...typographySx }}>
                    <Typography component="span" sx={{ color: '#fff', ...spanSx, ml: 2 }}>company:</Typography>
                    <Typography component="span" sx={{ color: '#9ca3af', ...spanSx }}>'</Typography>
                    <Typography component="span" sx={{ color: '#10b981', ...spanSx }}>{profileData.company}</Typography>
                    <Typography component="span" sx={{ color: '#9ca3af', ...spanSx }}>',</Typography>
                </Typography>

                <Typography sx={{ ...typographySx }}>
                    <Typography component="span" sx={{ color: '#fff', ...spanSx, ml: 2 }}>location:</Typography>
                    <Typography component="span" sx={{ color: '#9ca3af', ...spanSx }}>'</Typography>
                    <Typography component="span" sx={{ color: '#10b981', ...spanSx }}>{profileData.location}</Typography>
                    <Typography component="span" sx={{ color: '#9ca3af', ...spanSx }}>,</Typography>
                </Typography>

                <Typography sx={{ ...typographySx }}>
                    <Typography component="span" sx={{ color: '#fff', ...spanSx, ml: 2 }}>followers:</Typography>
                    <Typography component="span" sx={{ color: '#fb923c', ...spanSx }}>{profileData.followers}</Typography>
                    <Typography component="span" sx={{ color: '#9ca3af', ...spanSx }}>,</Typography>
                </Typography>

                <Typography sx={{ ...typographySx }}>
                    <Typography component="span" sx={{ color: '#fff', ...spanSx, ml: 2 }}>following:</Typography>
                    <Typography component="span" sx={{ color: '#fb923c', ...spanSx }}>{profileData.following}</Typography>
                    <Typography component="span" sx={{ color: '#9ca3af', ...spanSx }}>,</Typography>
                </Typography>

                <Typography sx={{ ...typographySx }}>
                    <Typography component="span" sx={{ color: '#fff', ...spanSx, ml: 2 }}>repositories:</Typography>
                    <Typography component="span" sx={{ color: '#fb923c', ...spanSx }}>{profileData.public_repos}</Typography>
                    <Typography component="span" sx={{ color: '#9ca3af', ...spanSx }}>,</Typography>
                </Typography>

                <Typography sx={{ ...typographySx, ml: 2 }}>
                    <Typography component="span" sx={{ color: '#fff', ...spanSx }}>skills:</Typography>
                    <Typography component="span" sx={{ color: '#9ca3af', ...spanSx }}>{`['`}</Typography>
                    {userData.skills.map((skill, i) => (
                        <>
                            <Typography component="span" sx={{ color: '#22d3ee', ...spanSx }}>{skill}</Typography>
                            {i !== userData.skills.length - 1 && <Typography component="span" sx={{ color: '#9ca3af', ...spanSx }}>', '</Typography>}
                        </>
                    ))}
                    <Typography component="span" sx={{ color: '#9ca3af', ...spanSx }}>'],</Typography>
                </Typography>

                <Typography sx={{ ...typographySx }}>
                    <Typography component="span" sx={{ color: '#fff', ...spanSx, ml: 2 }}>hireable:</Typography>
                    <Typography component="span" sx={{ color: '#fb923c', ...spanSx }}>{profileData?.hireable.toString()}</Typography>
                    <Typography component="span" sx={{ color: '#9ca3af', ...spanSx }}>,</Typography>
                </Typography>

                <Typography sx={{ fontFamily: 'Fira Code', color: '#9ca3af' }}>
                    {'};'}
                </Typography>

            </Box>

        </Box >
    )
}

export default CodeInfo