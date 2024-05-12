import { Box, Typography } from "@mui/material";
import HomeBg from "../assets/images/home-background.jpg";
import { StaticImageData } from "next/image";

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
      }}
    >
      <BlurredBackground imageUrl={HomeBg.src} />
      <Box sx={{
        position: "relative",
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography>Amit</Typography>
        <Typography>Rana</Typography>
        <Typography>Software Engineer</Typography>
      </Box>
    </Box>
  );
}
