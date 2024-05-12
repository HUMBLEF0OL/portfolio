import { Box, Typography } from "@mui/material";
import HomeBg from "../assets/images/home-background.jpg";
import { StaticImageData } from "next/image";
import Profile from "@/components/Profile/Profile";
import GitStats from "@/components/GitStats/GitStats";
import Projects from "@/components/Projects/Projects";
import GitLanguages from "@/components/GitLanguages/GitLanguages";
import Rank from "@/components/Rank/Rank";
import Contributions from "@/components/Contributions/Contributions";

const BlurredBackground: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "blur(4px) brightness(50%)",
        zIndex: -1,
      }}
    />
  );
}

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: "100%",
        height: "100vh",
        fontFamily: "Fira Code"
      }}
    >
      <BlurredBackground imageUrl={HomeBg.src} />
      <Box sx={{
        position: "relative",
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        rowGap: '500px',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Profile />
        <GitStats />
        <Projects />
        <GitLanguages />
        <Rank />
        <Contributions />
      </Box>
    </Box>
  );
}
