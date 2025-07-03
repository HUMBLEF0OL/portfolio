import About from "@/block/About";
import HomeComponent from "@/block/Home";
import ThemeSwitch from "@/block/ThemeSwitch";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-[fit-content] flex flex-col items-center justify-center gap-[80px]">
      <HomeComponent />
      <HomeComponent />

      <HomeComponent />

      {/* <About /> */}
    </div>
  );
}
