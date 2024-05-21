import { Box, Button, ButtonBase, Typography } from '@mui/material'

import React from 'react'
import UserInfo from './UserInfo'
import CodeInfo from './CodeInfo'
import { UserProfileData } from '@/interfaces/userProfileInterface'

const Profile: React.FC<{ profileData: UserProfileData }> = ({ profileData }) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: 'fit-content',
                display: 'flex',
                justifyContent: 'center',
                columnGap: '40px',
            }}>
            <UserInfo profileData={profileData} />
            <CodeInfo profileData={profileData} />
        </Box>
    )
}

export default Profile