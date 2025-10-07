import Editor from "./editor";
import Toolbar from "./Toolbar";
import Navbar from "./navbar";


interface DocumentIdPageProps {  
    params: Promise<{
        documentId: string // documentId is a slug
    }>
}

const page = async ({params}: DocumentIdPageProps) => {
  const {documentId} = await params;
  
    return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-20 bg-[#FAFBFD] print:hidden">
        <Navbar/>
        <Toolbar />
      </div>
      <div className="pt-[115px] print:pt-0">
        <Editor />
      </div>
    </div>
  )
}

export default page