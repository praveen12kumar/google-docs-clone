import Link from "next/link";
import Navbar from "./navbar";
import TemplatesGallery from "./template-gallery";


export default function Home() {
  return (
    <>
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-20 h-16 p-4 bg-white">
        <Navbar/>
      </div>
      <div className="mt-16">
        <TemplatesGallery/>
      </div>
    </div>
    </>
  );
}
