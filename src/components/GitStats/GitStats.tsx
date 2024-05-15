import { Box } from '@mui/material'
import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import Image from 'next/image'
import { userData } from '@/constants/userData'

const GitStats = () => {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: '40px' }}>
            <SectionTitle title={'github statistics'} />

            {/* <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    src={`http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${userData.githubUser}&theme=algolia`}
                    // src={'https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=HUMBLEF0OL&theme=material-palenight'}
                    width={1080}
                    height={520}
                    alt='github profile-details'
                    style={{
                        borderRadius: '10px',
                        maxWidth: '100%'
                    }}
                />

                <Box sx={{
                    display: 'flex',
                    width: '520px',
                    columnGap: '20px'
                }}>
                    <Box sx={{
                        width: '50%',
                        '-webkit-box-shadow': '0px 0px 285px 21px rgba(235,9,220,0.25)',
                        '-moz-box-shadow': '0px 0px 285px 21px rgba(235,9,220,0.25)',
                        boxShadow: '0px 0px 269px 176px  rgba(235,9,220,0.25)',
                        backgroundColor: "#1a0324"
                    }}>
                        <Image
                            src={'https://github-readme-stats.vercel.app/api?username=humblef0ol&show=prs_merged_percentage&show_icons=true&theme=material-palenight&hide=issues'}
                            width={520}
                            height={260}
                            style={{ maxHeight: '520px' }}
                            alt="github stats"
                        />
                    </Box>

                    <Box sx={{ width: '50%' }}>
                        <Image
                            src={`https://github-readme-stats.vercel.app/api?username=${userData.githubUser}&show_icons=true&include_all_commits=true&theme=algolia&hide_border=true`}
                            width={520}
                            height={260}
                            alt="github stats"
                        />
                    </Box>

                </Box>
            </Box> */}

        </Box>
    )
}

export default GitStats