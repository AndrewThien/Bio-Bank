'use client';
import { ArrowLeftCircle, Loader2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import styles from '@/app/table.module.css';
import toast from "react-hot-toast";
import SamplesList from "@/components/SamplesList";
import AddSample from "@/components/AddSample";
import LoadingPage from '@/components/LoadingPage';
import { useQuery } from 'react-query';
import { useState } from 'react';
import CollectionList from '@/components/CollectionList';

// Define page property
type Props = {
  params: {
    collection_id: string; 
  };
};


const SamplePage =  ({ params: { collection_id } }: Props) => {

  // Parse the collection id from the url
  const parsedCollectionId = parseInt(collection_id, 10);

  const [isCollectionLoaded, setIsCollectionLoaded] = useState(false);

  const handleLoadingChange = (isLoading: boolean) => {
    setIsCollectionLoaded(!isLoading);
  };

  return (
    <>    
    {/* Top sticky Nav Bar */}
    <div className="sticky top-0 z-50 flex flex-col justify-center items-center w-full bg-white px-4">
      {/* Title */}
      <div className="mt-2 mb-2">
        <Link href="/">
          <h1 className="text-3xl font-semibold">BIO BANK</h1>
        </Link>
      </div>
      {/* Home button */}
      <div>
        <Link href='/'>
          <Button className='mb-2'>Home <Home className='ml-2' /></Button>
        </Link>
      </div>
    </div>

    {/* Main content */}
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-sky-400 to-sky-200">
      {/* Make the page responsive by adding 'sm' attribute */}
      <div className="mt-5 flex flex-col sm:flex-row justify-center">
        <div className="flex flex-col sm:flex-row items-start sm:items-center text-center sm:w-full">
          <div className="sm:w-2/3 sm:mr-10">

            {/* Show collection details for reference of the current sample record */}
            <CollectionList collection_id={parsedCollectionId} onLoading={handleLoadingChange} />

            {/* Show list of samples */}
            {isCollectionLoaded && (
              <div className="flex flex-col items-center text-center">
                <h1 className="mb-1 mt-5 text-2xl font-semibold">Samples Record Details</h1>
                <SamplesList collection_id={parsedCollectionId} />
              </div>
            )}
          </div>
          
          {/* Add new sample function */}
          {isCollectionLoaded && (
            <div className="sm:w-1/3 mt-5 sm:mt-0 items-center text-center">
              <h1 className="mb-1 mt-5 text-xl font-semibold">Add a new sample record to this collection? Do it here</h1>
              <AddSample collection_id={parsedCollectionId} />
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
  

export default SamplePage;