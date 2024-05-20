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

export default function Home() {
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
      <Profile />
      <GitStats />
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