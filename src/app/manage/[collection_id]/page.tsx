'use client';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/app/table.module.css';
import toast from "react-hot-toast";
import axios from "axios";
import SamplesList from "@/components/SamplesList";
import AddCollection from "@/components/AddCollection";
import AddSample from "@/components/AddSample";
import { error } from 'console';

interface CollectionData {
  id: number; 
  created_at: Date;
  title: string;
  disease: string; 
}

type Props = {
  params: {
    collection_id: string; 
  };
};

const SamplePage =  ({ params: { collection_id } }: Props) => {
  const [collectionData, setCollectionData] = useState<CollectionData[] | null>(null);
  const parsedCollectionId = parseInt(collection_id, 10);

  useEffect(() => {
    fetchCollectionData();
  }, []); // Added an empty dependency array to useEffect to ensure it runs only once

  const fetchCollectionData = async () => {
    try {
      const collectionResponse = await fetch('/api/collections');
      const allCollectionData: CollectionData[] = await collectionResponse.json();
      const collectionData = allCollectionData.find(collection => collection.id === parsedCollectionId);
      // Type guard and checking if prevCollectionData is null before trying to spread it
      if (collectionData) {
        setCollectionData(prevCollectionData => [
          ...(prevCollectionData || []), 
          collectionData
        ]);
      }
    } catch (error: any) {
      console.error('Error getting collection data');
      toast.error('Error getting collection data');
    }
  };
  


  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-sky-400 to-sky-200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-1 text-2xl font-semibold">Collection Details</h1>
          {collectionData && (
            <div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Associated Disease</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                {collectionData.map((collection) => (
                  <tr key={collection.id}>
                    <td>{collection.id}</td>
                    <td>{collection.title}</td>
                    <td>{collection.disease}</td>
                    <td>{collection.created_at}</td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          )}
          <h1 className="mb-1 mt-5 text-2xl font-semibold">Samples Record Details</h1>
          <SamplesList collection_id={parsedCollectionId} />
          <h1 className="mb-1 mt-3 text-2xl font-semibold">Add a new sample record to this collection</h1>
          <AddSample collection_id={parsedCollectionId} />
          <Link className='mt-2' href='/'>
            <Button>Home <Home className='ml-3'/></Button></Link>
        </div>
      </div>
    </div>
  );
}

  

export default SamplePage;