import Image from "next/image";
import sethji from '../../public/sethji.jpg'
export default function Home() {
  return (
   <>
   <div className="w-full ">
    <Image src={sethji} alt="Hero section Image" className="w-full h-200"></Image>
   </div>
   </>
  );
}
