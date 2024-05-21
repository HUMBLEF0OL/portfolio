import { Box, Typography } from "@mui/material";
import HomeBg from "../assets/images/home-background.jpg";
import { StaticImageData } from "next/image";
import Profile from "@/components/Profile/Profile";
import GitStats from "@/components/GitStats/GitStats";
import Projects from "@/components/Projects/Projects";
import Rank from "@/components/Rank/Rank";
import Contributions from "@/components/Contributions/Contributions";
import LanguageStats from "@/components/LanguageStats/LanguageStats";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { userData } from "@/constants/userData";
import { Repository } from "@/interfaces/userProjectInterface";

// const BlurredBackground: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
//   return (
//     <Box
//       sx={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         filter: "blur(4px) brightness(50%)",
//         zIndex: -1,
//       }}
//     />
//   );
// }
async function getGitProfile() {
  const res = await fetch(`${process.env.NEXT_USER_PROFILE_URL}${userData.githubUser}`)
  if (!res.ok) {
    throw new Error('Failed to fetch user profile data')
  }
  return res.json();
}

async function getGitProjects() {
  const response = await fetch(`${process.env.NEXT_USER_PROFILE_URL}${userData.githubUser}/repos`);
  if (!response.ok) {
    throw new Error(`Failed to fetch repositories for user ${userData.githubUser}`);
  }
  const repositories: Repository[] = await response.json();
  // Filter repositories that the user owns (forked repositories will be excluded)
  const ownedRepositories = repositories.filter(repo => !repo.fork);
  // Sort repositories by creation date in descending order
  ownedRepositories.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return ownedRepositories.slice(0, 10);

}
export default async function Home() {
  const profileData = await getGitProfile();
  const projectData = await getGitProjects();
  console.log('profileData is ', profileData);
  // console.log('projectData is ', projectData);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        fontFamily: "Fira Code",
        rowGap: '100px',
        px: '40px'
      }}
    >
      <Profile profileData={profileData} />
      {/* <GitStats /> */}
      {/* <Projects projectData={projectData} /> */}
    </Box>
  );
}


//
// {/* <Profile /> // adjustment in icon styles
// <GitStats /> */}
// <Rank />
// {/* <Contributions /> */}
// {/* <Profile /> */}
// <Rank />
// <Projects />


// {/* check */}
// <LanguageStats />
// {/* check */}
// <Contributions />
// {/* check */}
// <Projects />

// <GitStats />
// {/* check */}
// <Profile />
// {/* check */}
// <Rank />