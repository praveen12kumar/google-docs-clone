import Link from "next/link";


export default function Home() {
  return (
    <>
    <div className="">
      <p className="font-bold text-2xl">Home Page</p>
      <p>Click <Link href="/documents/127"><span className="text-blue-500 hover:underline">here</span></Link> to go to document page</p>
    </div>
    </>
  );
}
