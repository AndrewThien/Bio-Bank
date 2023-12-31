'use client';

import Link from 'next/link';
import AddCollection from '@/components/AddCollection';
import LoadingPage from '@/components/LoadingPage';
import CollectionList from '@/components/CollectionList';
import { useState } from 'react';

export default function HomePage() {
  // Define loading state
  const [isCollectionLoaded, setIsCollectionLoaded] = useState(false);
  // Define handle loading state change function
  const handleLoadingChange = (isLoading: boolean) => {
    setIsCollectionLoaded(!isLoading);
  };

  return (
    <>
    {/* Top sticky Nav Bar */}
    <div className="sticky top-0 z-50 flex items-center justify-center w-full bg-white">
      <Link href="/">
        <div className="flex items-center">
          <h1 className="mt-2 mb-2 text-3xl font-semibold">BIO BANK</h1>
        </div>
      </Link>
    </div>
    {/* Main content */}
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-sky-400 to-sky-200">
      {/* Make the page responsive by adding 'sm' attribute */}
      <div className="mt-5 flex flex-col sm:flex-row justify-center">
        <div className="flex flex-col sm:flex-row items-start sm:items-center text-center sm:w-full">
          <div className="sm:w-2/3 sm:mr-10">
            {/* Show the collection data on a nice table using CSS style */}
            <CollectionList collection_id={-1} onLoading={handleLoadingChange}/>
          </div>
          
          {/* Add a new collection function*/}
          {isCollectionLoaded && (
              <div className="w-full sm:w-1/3 mt-5 sm:mt-0">
                <div className="flex flex-col items-center text-center">
                  <h1 className="mb-3 mt-5 text-xl font-semibold">
                    Add a new collection? Do it here </h1>
                  <AddCollection />
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
    </>
  );
}