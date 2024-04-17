import { Typography } from "@mui/material";
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
    <main className={styles.container}>
      <div className={styles.description}>
        <Typography sx={{
          fontFamily: 'Fira Code'
        }}>dummy in cascadia code</Typography>
      </div>
    </main>
  );
}
