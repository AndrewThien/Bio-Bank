'use client';
import { ArrowLeftCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import styles from '@/app/table.module.css';
import toast from "react-hot-toast";
import SamplesList from "@/components/SamplesList";
import AddSample from "@/components/AddSample";
import LoadingPage from '@/components/LoadingPage';
import { useQuery } from 'react-query';

// Define the collection data type
interface CollectionData {
  id: number; 
  created_at: Date;
  title: string;
  disease: string; 
}

// Define page property
type Props = {
  params: {
    collection_id: string; 
  };
};


const SamplePage =  ({ params: { collection_id } }: Props) => {
  const parsedCollectionId = parseInt(collection_id, 10);


  // Set Fetch collection data
  const fetchCollectionData = async () => {
    try {
      const collectionResponse = await fetch('/api/collections');
      const allCollectionData: CollectionData[] = await collectionResponse.json();
    // Filter the collection data to get the collection with the id passed in the url
    return allCollectionData.find(collection => collection.id === parsedCollectionId);
    } catch (error: any) {
      console.error('Error getting collection data');
      toast.error('Error getting collection data');
    }
  };

  const { data: collectionData, isLoading } = useQuery('collectionData', fetchCollectionData);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>    
    {/* Top sticky Nav Bar */}
    <div className="sticky top-0 z-50 flex justify-between items-center w-full bg-white px-4">
      {/* Home button */}
      <div>
        <Link href='/'>
          <ArrowLeftCircle className='ml-5' />
        </Link>
      </div>

      {/* Title */}
      <div className="flex justify-center flex-grow">
        <Link href="/">
          <h1 className="mt-2 mb-2 text-3xl font-semibold">BIO BANK</h1>
        </Link>
      </div>

      {/* Empty div to keep the title centered */}
      <div></div>
    </div>
    {/* Main content */}
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-400 to-sky-200">
      <div className="flex flex-col sm:flex-row justify-center">
        <div className="flex flex-col sm:flex-row items-start sm:items-center text-center sm:w-full">
          <div className="sm:w-2/3 sm:mr-10">

            {collectionData && (
              <div className="text-center w-full">
                <h1 className="mb-1 mt-5 text-2xl font-semibold">Collection Details</h1>
              </div>
            )}
            {/* Collection details */}
            {collectionData && (
              <div>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Collection Title</th>
                      <th>Associated Disease</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{collectionData.id}</td>
                      <td>{collectionData.title}</td>
                      <td>{collectionData.disease}</td>
                      <td>{new Date(collectionData.created_at).toLocaleDateString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {/* Show list of samples */}
            {collectionData && (
              <div className="flex flex-col items-center text-center">
                <h1 className="mb-1 mt-5 text-2xl font-semibold">Samples Record Details</h1>
                <SamplesList collection_id={parsedCollectionId} />
              </div>
            )}
          </div>
          {/* Add new sample function */}
          {collectionData && (
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