import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import { Box, Grid, Typography } from '@mui/material'
import StatsCard from '../StatsCard/StatsCard'
import Link from 'next/link'
import LinkIcon from '@mui/icons-material/Link';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { colors } from '@/constants/colorConstants'
import StyledButton from '../Inputs/StyledButton'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { userData } from '@/constants/userData'
import { Repository } from '@/interfaces/userProjectInterface'
// after response filter the repositories on the basis of fork flag
// https://api.github.com/search/repositories?q=user:humblef0ol+fork:false&sort=created&direction=desc&per_page=10&type=Repositories
// 
const Projects = ({ projectData }: { projectData: Repository[] }) => {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '40px',
            mt: '100px',
            px: '40px'
        }}>
            <SectionTitle title={'Projects'} />

            <Box sx={{
                display: 'flex',
                columnGap: '16px',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: '20px',
                flexWrap: 'wrap'

                // width: '100%'
            }}>
                {
                    projectData.map((current, index) => {
                        return (
                            <Box sx={{ width: '49.25%', height: '175px' }} key={index}>
                                <Link href={current.html_url} style={{ textDecoration: 'none' }}>
                                    <StatsCard isLink={true}>
                                        <Grid container sx={{ px: '12px', rowGap: '12px', alignItems: 'center' }}>
                                            <Grid item container justifyContent={'space-between'}>
                                                <Grid item>
                                                    <Typography variant='h3' sx={{ color: '#7d5ba2' }}>
                                                        {current.name}

                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <LinkIcon sx={{ color: '#7d5ba2', width: '20px', height: '20px' }} />
                                                </Grid>
                                            </Grid>
                                            <Grid item >
                                                <Typography sx={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    width: '100%',
                                                    textAlign: 'justify',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3, // Set the maximum number of lines
                                                    WebkitBoxOrient: 'vertical',
                                                    color: '#fff',
                                                    letterSpacing: '1.25px'

                                                    // overflow: 'hidden',
                                                }}
                                                    variant='subtitle2'
                                                >
                                                    {current.description}
                                                </Typography>
                                            </Grid>
                                            <Grid item container justifyContent={'space-between'}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    columnGap: '20px',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        columnGap: '6px',
                                                        alignItems: 'center'

                                                    }}>
                                                        <StarHalfIcon sx={{ width: '25px', height: '25px', color: '#7d5ba2' }} />
                                                        <Typography sx={{ fontSize: '20px', color: '#fff' }}>{current.stargazers_count}</Typography>
                                                    </Box>

                                                    <Box sx={{
                                                        display: 'flex',
                                                        columnGap: '6px',
                                                        alignItems: 'center'
                                                    }}>
                                                        <svg fill="#7d5ba2" stroke-width="0" viewBox="0 0 448 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M80 104a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm80-24c0 32.8-19.7 61-48 73.3V192c0 17.7 14.3 32 32 32H304c17.7 0 32-14.3 32-32V153.3C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V192c0 53-43 96-96 96H256v70.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V288H144c-53 0-96-43-96-96V153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm208 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48zM248 432a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z"></path></svg>
                                                        <Typography sx={{ fontSize: '20px', color: '#fff' }}>{current.forks_count}</Typography>

                                                    </Box>

                                                </Box>
                                                <Box sx={{
                                                    display: 'flex',
                                                    columnGap: '6px',
                                                    alignItems: 'center'
                                                }}>
                                                    <Box sx={{
                                                        width: '14px',
                                                        height: '14px',
                                                        borderRadius: '50%',
                                                        backgroundColor: colors[current?.language ? current?.language : 'javascript']
                                                    }} />
                                                    <Typography variant='subtitle1' sx={{ color: colors[current?.language ? current?.language : 'javascript'] }}>{current.language}</Typography>


                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </StatsCard>
                                </Link>
                            </Box>
                        )
                    })
                }

                <StyledButton text='All Projects' icon={<DoubleArrowIcon sx={{ height: '20px', width: '20px' }} />} url={`${userData.github}?tab=repositories`} />

            </Box>

        </Box >
    )
}

export default Projects