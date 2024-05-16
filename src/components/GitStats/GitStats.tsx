import { Box } from '@mui/material'
import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import Image from 'next/image'
import { userData } from '@/constants/userData'

const GitStats = () => {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: '40px', mt: '100px' }}>
            <SectionTitle title={'github statistics'} />

            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    src={`https://github-profile-trophy.vercel.app/?username=humblef0ol&theme=radical&no-frame=true&no-bg=false&margin-w=12`}
                    width={900}
                    height={250}
                    alt='github profile-details'
                    style={{
                        borderRadius: '10px',
                        width: '100%',
                        // paddingInline: '40px'
                    }}
                // objectFit='contains'
                />

                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    columnGap: '20px'
                }}>
                    <Box sx={{
                        // width: '50%',
                        // '-webkit-box-shadow': '0px 0px 285px 21px rgba(235,9,220,0.25)',
                        // '-moz-box-shadow': '0px 0px 285px 21px rgba(235,9,220,0.25)',
                        // boxShadow: '0px 0px 269px 176px  rgba(235,9,220,0.25)',
                        // backgroundColor: "#1a0324"
                    }}>
                        <Image
                            src={'https://github-readme-stats.vercel.app/api?username=humblef0ol&show=prs_merged_percentage&show_icons=true&theme=tokyonight&hide=issues'}
                            width={400}
                            height={180}
                            // style={{ maxHeight: '520px' }}
                            alt="github stats"
                        />
                    </Box>

                    <Box>
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
                    </Box>

                </Box>
            </Box>

        </Box>
    )
}

export default GitStats