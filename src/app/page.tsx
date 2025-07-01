import HomeComponent from "@/block/Home";
import ThemeSwitch from "@/block/ThemeSwitch";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-[75%] h-[fit-content]">
      <HomeComponent />
    </div>
  );
}
