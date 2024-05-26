import { Box } from '@mui/material'
import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import Image from 'next/image'
import { userData } from '@/constants/userData'
import StatsCard from '../StatsCard/StatsCard'

const GitStats = () => {
    return (
        <Box
            id="stats"
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '40px',
                pt: '100px'

            }}>
            <SectionTitle title={'github statistics'} />

            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: '40px'
            }}>
                <Image
                    src={`https://github-profile-trophy.vercel.app/?username=humblef0ol&theme=radical&no-frame=true&no-bg=false&margin-w=12`}
                    width={900}
                    height={290}
                    alt='github trophies'
                    style={{
                        width: '100%',
                    }}
                />


                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    columnGap: '40px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <StatsCard isLink={false}>
                        <Image
                            src={'https://github-readme-stats.vercel.app/api?username=humblef0ol&show=prs_merged_percentage&show_icons=true&theme=tokyonight&hide=issues&hide_border=true'}
                            width={560}
                            height={245}
                            // style={{ maxHeight: '520px' }}
                            alt="github stats"
                        />

                    </StatsCard>

                    <StatsCard isLink={false}>
                        <Image
                            src={'https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=humblef0ol&theme=tokyonight'}
                            width={560}
                            height={245}
                            alt='language-stats'
                        />
                    </StatsCard>
                </Box>
                {/* <StatsCard isLink={false}>
                        <Image
                            src={'https://github-readme-stats.vercel.app/api?username=humblef0ol&show=prs_merged_percentage&show_icons=true&theme=tokyonight&hide=issues'}
                            width={400}
                            height={180}
                            // style={{ maxHeight: '520px' }}
                            alt="github stats"
                        />

                        <StatsCard isLink={false}>
                            <Image
                                src={`http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=humblef0ol&theme=tokyonight`}
                                width={600}
                                height={260}
                                alt='github profile-details'
                                style={{
                                    // borderRadius: '10px',
                                    // maxWidth: '100%'
                                }}
                            />
                        </StatsCard>

                    </StatsCard> */}
            </Box>
        </Box>

    )
}

export default GitStats