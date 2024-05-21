import { BACKGROUND_PRI } from '@/constants/colorConstants'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { userData } from '@/constants/userData'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import StyledButton from '../Inputs/StyledButton'
import DownloadIcon from '@mui/icons-material/Download';


const UserInfo = ({ profileData }: { profileData: any }) => {
    return (
        <Box sx={{
            backgroundColor: BACKGROUND_PRI,
            // backgroundColor: 'yellow',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            px: '40px',
            py: '16px',
            rowGap: '16px',
            borderRadius: '10px'
        }}>
            <Image
                src={profileData.avatar_url}
                style={{
                    borderRadius: '50%',
                    border: '1.5px solid black'
                }}
                width={128}
                height={128}
                alt='avatar' />
            <Typography variant='h4' sx={{ lineHeight: 1.25 }} textAlign={'center'}>{profileData.bio}</Typography>
            <Box sx={{
                display: 'flex',
                columnGap: '16px'
            }}>
                <Link href={userData.linkedIn} target='_blank' >
                    <LinkedInIcon sx={{ height: '30px', width: '30px' }} />
                </Link>
                <Link href={userData.instagram} target='_blank' >
                    <InstagramIcon sx={{ height: '30px', width: '30px' }} />
                </Link>
                <Link href={userData.twitter} target='_blank' >
                    <XIcon sx={{ height: '30px', width: '30px' }} />
                </Link>
                <Link href={userData.github} target='_blank' >
                    <GitHubIcon sx={{ height: '30px', width: '30px' }} />
                </Link>
                <Link href={userData.leetcode} target='_blank' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M13.483 0a1.37 1.37 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.3 5.3 0 0 0-1.209 2.104a5 5 0 0 0-.125.513a5.5 5.5 0 0 0 .062 2.362a6 6 0 0 0 .349 1.017a5.9 5.9 0 0 0 1.271 1.818l4.277 4.193l.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.38 1.38 0 0 0-1.951-.003l-2.396 2.392a3.02 3.02 0 0 1-4.205.038l-.02-.019l-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.7 2.7 0 0 1 .066-.523a2.55 2.55 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0m-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382a1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382a1.38 1.38 0 0 0-1.38-1.382z" /></svg>
                </Link>
            </Box>
            <StyledButton text='get resume' url='http://www.google.com' icon={<DownloadIcon sx={{ height: '20px', width: '20px' }} />} />

        </Box>
    )
}

export default UserInfo