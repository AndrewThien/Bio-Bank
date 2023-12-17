'use client';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/app/table.module.css';
import toast from "react-hot-toast";
import AddCollection from '@/components/AddCollection';

interface CollectionData {
  id: number; 
  title: string; 
  disease: string; 
}
// add loading state and indicator


export default function HomePage() {
  const [collectionData, setCollectionData] = useState<CollectionData[] | null>(null);

  useEffect(() => {
    fetchCollectionData();
  }, []); // Added an empty dependency array to useEffect to ensure it runs only once

  const fetchCollectionData = async () => {
    try {
      const collectionResponse = await fetch('/api/collections');
      const collectionData: CollectionData[] = await collectionResponse.json();
      setCollectionData(collectionData);
    } catch (error) {
      console.error('Error getting collection data:', error.message);
      toast.error('Error getting collection data');
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-sky-400 to-sky-200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-1 text-3xl font-semibold">BIO BANK</h1>
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
        <div className="flex flex-col items-center text-center">
        <h1 className="mb-1 mt-5 text-2xl font-semibold">Add a new collection to Bio Bank</h1>
          <AddCollection />
        </div>
      </div>
    </div>
  );
}