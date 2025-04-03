import Image from "next/image";
import Navbar from "./_componants/Navbar";
import Landing from "./_componants/Lsanding";
import Our from "./_componants/Our";
import Top from "./_componants/Top";
import Categories from "./_componants/Categories";
import Thanks from "./_componants/Thanks";
import Footer from "./_componants/Footer";
import Partnar_sec from "./_componants/partenar_sec";

export default function Home() {
  return (
    <div className="parent flex flex-col max-xl:gap-[100px]">
      <Navbar className="text-white absolute max-xl:absolute max-xl:w-full" white={true} />
      <Landing />
      <Our />
      <Categories />
      <Partnar_sec />
      <Top />
      <Thanks />
    </div>
  );
}
