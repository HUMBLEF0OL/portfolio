import About from "@/block/About";
import { Divider } from "@/block/Divider";
import HomeComponent from "@/block/Home";
import ThemeSwitch from "@/block/ThemeSwitch";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-[fit-content] flex flex-col items-center justify-center">
      <HomeComponent />

      <Divider variant='type1' />
    </div>
  );
}
