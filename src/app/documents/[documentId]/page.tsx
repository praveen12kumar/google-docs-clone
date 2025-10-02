import Editor from "./editor";
import Toolbar from "./Toolbar";

interface DocumentIdPageProps {  
    params: Promise<{
        documentId: string // documentId is a slug
    }>
}

const page = async ({params}: DocumentIdPageProps) => {
  const {documentId} = await params;
  
    return (
    <div>
      <Toolbar />
      <Editor />
    </div>
  )
}

export default page