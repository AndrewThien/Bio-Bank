'use client';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import SamplesList from "@/components/SamplesList";
import AddSample from "@/components/AddSample";
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
  // Define state indicating if the collection list is loaded
  const [isCollectionLoaded, setIsCollectionLoaded] = useState(false);
  // Define handle loading state change function
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
      <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center text-center">
        <div className="sm:w-2/3 sm:mr-10">
          {/* Show collection details for reference of the current sample record */}
          <CollectionList collection_id={parsedCollectionId} onLoading={handleLoadingChange} />
          {/* Show list of samples */}
          {isCollectionLoaded && 
          <SamplesList collection_id={parsedCollectionId} />
          }
        </div>
        <div className="sm:w-1/3 mt-5 sm:mt-0">
          {/* Add new sample function */}
          {isCollectionLoaded && 
          <AddSample collection_id={parsedCollectionId} />
          }
        </div>
      </div>
    </div>
    </>
  );
}
  

export default SamplePage;