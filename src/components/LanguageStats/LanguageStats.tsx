import { Box } from '@mui/material'
import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import Image from 'next/image'
import StatsCard from '../StatsCard/StatsCard'

const LanguageStats = () => {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '40px',
            mt: '100px',
            px: '40px'
        }}>
            <SectionTitle title={'Language statistics'} />
            <Box sx={{
                width: '100%',
                display: 'flex',
                columnGap: '40px',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <StatsCard isLink={false}>
                    <Image
                        src={'https://github-readme-stats.vercel.app/api/top-langs/?username=HUMBLEF0OL&layout=compact&langs_count=10&theme=tokyonight&hide_border=true&custom_title=Most%20Used%20Languages'}
                        width={280}
                        height={250}
                        alt='language-stats'
                    />

                </StatsCard>

                <StatsCard isLink={false}>
                    <Image
                        src={'https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=humblef0ol&theme=tokyonight'}
                        width={520}
                        height={250}
                        alt='language-stats'
                    />
                </StatsCard>
            </Box>
        </Box>
    )
}

export default LanguageStats