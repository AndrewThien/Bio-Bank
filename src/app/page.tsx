'use client';
import { Button } from '@/components/ui/button';
import { Dna, Loader2 } from 'lucide-react';
import { useQuery } from 'react-query';
import Link from 'next/link';
import styles from '@/app/table.module.css';
import toast from "react-hot-toast";
import AddCollection from '@/components/AddCollection';
import { useState } from 'react';

interface CollectionData {
  id: number; 
  title: string; 
  disease: string; 
}

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
  const [loading, setLoading] = useState(true);

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

  const { data: collectionData } = useQuery('collections', fetchCollectionData);

  if (loading) {
    return <LoadingPage />;
  }
   return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-sky-400 to-sky-200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mb-1 mr-3 text-3xl font-semibold">BIO BANK</h1><Dna />
          </div>
          {collectionData && (
            <div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Associated Disease</th>
                  </tr>
                </thead>
                <tbody>
                  {collectionData.map((collection) => (
                    <tr key={collection.id}>
                      <td>{collection.id}</td>
                      <td>
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
        {collectionData && (      
        <div className="flex flex-col items-center text-center">
        <h1 className="mb-3 mt-5 text-2xl font-semibold">Add a new collection to Bio Bank</h1>
          <AddCollection />
        </div>)}
      </div>
    </div>
  );
}