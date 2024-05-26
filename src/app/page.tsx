import { Box } from "@mui/material";
import Profile from "@/components/Profile/Profile";
import GitStats from "@/components/GitStats/GitStats";
import Projects from "@/components/Projects/Projects";
import Rank from "@/components/Rank/Rank";
import Contributions from "@/components/Contributions/Contributions";
import LanguageStats from "@/components/LanguageStats/LanguageStats";
import { userData } from "@/constants/userData";
import { Repository } from "@/interfaces/userProjectInterface";

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

export async function generateMetadata(
  { params, searchParams }: { params: Record<string, string>; searchParams: URLSearchParams }, parent: any) {
  const profile = await getGitProfile();
  return {
    title: `Portfolio of ${profile.name}`,
    description: profile.description
  }
}

export default async function Home() {
  const profileData = await getGitProfile();
  const projectData = await getGitProjects();

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
      }}
    >
      <Profile profileData={profileData} />
      <GitStats />
      <Rank />
      <LanguageStats />
      <Projects projectData={projectData} />
      <Contributions />
    </Box>
  );
}
