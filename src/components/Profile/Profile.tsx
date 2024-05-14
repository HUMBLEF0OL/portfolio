import { Box, Button, ButtonBase, Typography } from '@mui/material'

import React from 'react'
import UserInfo from './UserInfo'
import CodeInfo from './CodeInfo'



const profileData = {
    "login": "HUMBLEF0OL",
    "id": 69069897,
    "node_id": "MDQ6VXNlcjY5MDY5ODk3",
    "avatar_url": "https://avatars.githubusercontent.com/u/69069897?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/HUMBLEF0OL",
    "html_url": "https://github.com/HUMBLEF0OL",
    "followers_url": "https://api.github.com/users/HUMBLEF0OL/followers",
    "following_url": "https://api.github.com/users/HUMBLEF0OL/following{/other_user}",
    "gists_url": "https://api.github.com/users/HUMBLEF0OL/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/HUMBLEF0OL/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/HUMBLEF0OL/subscriptions",
    "organizations_url": "https://api.github.com/users/HUMBLEF0OL/orgs",
    "repos_url": "https://api.github.com/users/HUMBLEF0OL/repos",
    "events_url": "https://api.github.com/users/HUMBLEF0OL/events{/privacy}",
    "received_events_url": "https://api.github.com/users/HUMBLEF0OL/received_events",
    "type": "User",
    "site_admin": false,
    "name": "AMIT RANA",
    "company": "Truminds Software Systems",
    "blog": "",
    "location": "Gurugram, India",
    "email": null,
    "hireable": true,
    "bio": "Software engineer, tech enthusiast, novel lover, and funny like Onizuka from Great Teacher Onizuka. Let's connect and create something awesome!",
    "twitter_username": null,
    "public_repos": 37,
    "public_gists": 0,
    "followers": 5,
    "following": 2,
    "created_at": "2020-08-01T06:26:15Z",
    "updated_at": "2024-04-13T12:24:26Z"
}
const Profile = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: 'fit-content',
                display: 'flex',
                justifyContent: 'center',
                columnGap: '40px',
                px: '40px'
            }}>
            <UserInfo profileData={profileData} />
            <CodeInfo profileData={profileData} />
        </Box>
    )
}

export default Profile