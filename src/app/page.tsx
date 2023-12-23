'use client';
import { Button } from '@/components/ui/button';
import { Dna, Loader2 } from 'lucide-react';
import { useQuery } from 'react-query';
import Link from 'next/link';
import styles from '@/app/table.module.css';
import toast from "react-hot-toast";
import AddCollection from '@/components/AddCollection';
import { useState } from 'react';

// Define the collection data type
interface CollectionData {
  id: number; 
  title: string; 
  disease: string; 
}

// Loading page
function LoadingPage() {
  return (
    <div>
      <div className="w-screen min-h-screen bg-gradient-to-b from-sky-400 to-sky-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center text-center">
          <div className="flex items-center text-2xl">
              <h1>Loading Bio Bank ...</h1>  
              <Loader2 className="h-10 w-10 animate-spin ml-2" /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  // Set loading state
  const [loading, setLoading] = useState(true);

  // Set Fetch collection data
  const fetchCollectionData = async () => {
    try {
      const collectionResponse = await fetch('/api/collections');
      const collectionData: CollectionData[] = await collectionResponse.json();
      setLoading(false);
      return collectionData;
    } catch (error: any) {
      toast.error('Error loading collections');
      setLoading(false);
    }
  };
  // Use react-query to fetch collection data and reflect the changes in UI
  const { data: collectionData } = useQuery('collections', fetchCollectionData);

  // If loading, show loading page
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-400 to-sky-200">
      <div className="flex justify-center text-center">
        <Link href="/">
          <div className="flex items-center">
            <h1 className="mt-5 mb-1 mr-3 text-3xl font-semibold">BIO BANK</h1><Dna />
          </div>
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row justify-center">
        <div className="w-full sm:w-2/3 sm:mr-10">
          {/* Show the collection data on a nice table using CSS style */}
          {collectionData && (
            <div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Collection Title</th>
                    <th>Associated Disease</th>
                  </tr>
                </thead>
                <tbody>
                  {collectionData.map((collection) => (
                    <tr key={collection.id}>
                      <td>{collection.id}</td>
                      <td>
                      {/* Link every title to its manage page*/}
                      <Link key={collection.id} href={`/manage/${collection.id}`}>
                        <Button>
                          <p className="w-full overflow-hidden truncate whitespace-nowrap text-ellipsis">
                          {collection.title}
                          </p>
                        </Button>
                      </Link>
                      </td>
                      <td>{collection.disease}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="w-full sm:w-1/3 mt-5 sm:mt-0">
          {/* Function to add a new collection */}
          {collectionData && (
            <div className="flex flex-col items-center text-center">
              <h1 className="mb-3 mt-5 text-xl font-semibold">
                Add a new collection? Do it here </h1>
              <AddCollection />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}