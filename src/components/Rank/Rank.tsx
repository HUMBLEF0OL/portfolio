import { Box } from '@mui/material'
import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import StatsCard from '../StatsCard/StatsCard'
import Image from 'next/image'

const Rank = () => {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '40px',
            mt: '100px',
            px: '40px'
        }}>
            <SectionTitle title={'Streaks And Ranks'} />

            <Box sx={{
                width: '100%',
                display: 'flex',
                columnGap: '40px',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'

            }}>
                <StatsCard isLink={false}>
                    <Image
                        src={'https://github-readme-streak-stats.herokuapp.com/?user=HUMBLEF0OL&theme=tokyonight&custom_title=streak-stats&hide_border=true'}
                        width={495}
                        height={195}
                        alt='streak-stats'
                    />
                </StatsCard>
                <StatsCard isLink={false}>
                    <Image
                        src={'https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=humblef0ol&theme=tokyonight'}
                        width={495}
                        height={195}
                        alt='streak-stats'
                    />
                </StatsCard>
            </Box>
            <Box sx={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <StatsCard isLink={false}>
                    <Image
                        src={'https://github-readme-activity-graph.vercel.app/graph?username=humblef0ol&theme=tokyo-night&custom_title=Contribution-History&hide_border=true'}
                        width={900}
                        height={350}
                        alt='language-stats'
                    />
                </StatsCard>
            </Box>


        </Box>
    )
}

export default Rank