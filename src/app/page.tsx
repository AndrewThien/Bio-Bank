'use client';
import { Button } from '@/components/ui/button';
import { useQuery } from 'react-query';
import Link from 'next/link';
import styles from '@/app/table.module.css';
import toast from "react-hot-toast";
import AddCollection from '@/components/AddCollection';
import LoadingPage from '@/components/LoadingPage';

// Define the collection data type
interface CollectionData {
  id: number; 
  title: string; 
  disease: string; 
}

export default function HomePage() {

  // Set Fetch collection data
  const fetchCollectionData = async () => {
    try {
      const collectionResponse = await fetch('/api/collections');
      const collectionData: CollectionData[] = await collectionResponse.json();
      return collectionData;
    } catch (error: any) {
      toast.error('Error loading collections');
    }
  };
  // Use react-query to fetch collection data and reflect the changes in UI
  const { data: collectionData, isLoading } = useQuery('collections', fetchCollectionData);

  // If loading, show loading page
  if (isLoading) {
    return <LoadingPage />;
  }

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-400 to-sky-200">

      <div className="flex flex-col sm:flex-row justify-center">
        <div className="w-full sm:w-2/3 sm:mr-10">
          {/* Show the collection data on a nice table using CSS style */}
          {collectionData && (
            <div>
              <h1 className="mb-3 mt-5 text-2xl font-semibold text-center">Collection List</h1>
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
    </>
  );
}