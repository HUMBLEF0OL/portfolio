import About from "@/block/About";
import Contact from "@/block/Contact";
import { Divider } from "@/block/Divider";
import Experience from "@/block/Experience";
import CyberpunkFooter from "@/block/Footer";
import HomeComponent from "@/block/Home";
import Projects from "@/block/Projects";
import Skills from "@/block/Skills";
import ThemeSwitch from "@/block/ThemeSwitch";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-[fit-content] max-w-[1440px] flex flex-col items-center justify-center">
      <HomeComponent />

      <Divider variant='type2' />
      <About />
      {/* <div className="flex relative self-start">
        <p className="absolute -top-[0px] left-0 w-fit bg-background">/// SKILLS.MODULE</p>
        <br />
        <p className=" top-[20px] left-0 absolute">loading...</p>
        <div className="mt-[5px]">
          <Divider variant="type1" />
        </div>
      </div> */}
      <Skills />
      <Divider variant="type2" />
      <Projects />
      {/* <div className="flex relative self-start">
        <p className="absolute -top-[0px] left-0 w-fit bg-background">/// XP.MODULE</p>
        <br />
        <p className=" top-[20px] left-0 absolute">loading...</p>
        <div className="mt-[5px]">
          <Divider variant="type1" />
        </div>
      </div>       */}
      <Experience />
      <Divider variant="type2" />
      <Contact />

    </div>
  );
}
