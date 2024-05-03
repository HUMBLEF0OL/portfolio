import { Box, Typography } from "@mui/material";
import styles from "./page.module.css";
import { Oxygen } from 'next/font/google'
// { 
//   display: 'swap',
//   variable: '--font-oxygen',
//   subsets: ['latin'],
// }
const oxygen = Oxygen({
  weight: ["300"],
  subsets: ['latin']
})

export default function Home() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    }}>
      <Typography>Amit</Typography>
      <Typography>Rana</Typography>
      <Typography>Software Engineer</Typography>

    </Box>
  );
}
