import { Box } from '@mui/material'
import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import StatsCard from '../StatsCard/StatsCard'
import Image from 'next/image'

const Rank = () => {
    return (
        <Box
            id="streak & rank"
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '40px',
                px: '40px',
                pt: "100px"
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
                        width={520}
                        height={220}
                        alt='streak-stats'
                    />
                </StatsCard>
                <StatsCard isLink={false}>
                    <Image
                        src={'https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=humblef0ol&theme=tokyonight'}
                        width={375}
                        height={220}
                        alt='streak-stats'
                    />
                </StatsCard>
            </Box>
            <StatsCard isLink={false}>
                <Image
                    src={'https://github-readme-activity-graph.vercel.app/graph?username=humblef0ol&theme=tokyo-night&custom_title=Contribution-History&hide_border=true'}
                    width={1125}
                    height={400}
                    alt='language-stats'
                />
            </StatsCard>
        </Box>
    )
}

export default Rank