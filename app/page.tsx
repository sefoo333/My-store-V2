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
      {/* <div className="upgrade bg-amber-100 w-full py-[30px] text-center flex justify-center items-center flex-col">
        <h1 className="text-[60px] font-semibold w-[650px]">Get Started Now With Sefoo Store</h1>
        <p className="text-[20px]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae blanditiis quo sequi quod, atque ad. Maiores autem ex modi enim,</p>
        
      </div> */}
    </div>
  );
}
