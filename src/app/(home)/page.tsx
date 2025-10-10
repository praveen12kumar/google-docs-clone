'use client';

import {usePaginatedQuery} from 'convex/react';

import Navbar from "./navbar";
import TemplatesGallery from "./template-gallery";
import {api} from '../../../convex/_generated/api';
import DocumentsTable from './documents-table';
import { useSearchParam } from '@/hooks/user-search-param';

export default function Home() {
  const [search] = useSearchParam();
  const {results, status, loadMore} = usePaginatedQuery(api.documents.get, {search}, {initialNumItems:5});
  


  return (
    <>
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-20 h-16 p-4 bg-white">
        <Navbar/>
      </div>
      <div className="mt-10">
        <TemplatesGallery/>
        <DocumentsTable documents={results} status={status} loadMore={loadMore}/>
      </div>
    </div>
    </>
  );
}
