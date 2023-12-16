'use client';
import { eq } from "drizzle-orm";
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/app/table.module.css';
import toast from "react-hot-toast";
import axios from "axios";
import { error } from "console";
import SamplesList from "@/components/SamplesList";

interface SamplesData {
  id: number; 
  collection_id: number;
  donor_count: number;
  material_type: string; 
  last_updated: Date; 
}

type Props = {
  params: {
    collection_id: string; // Change type to string if collection_id is expected to be a string
  };
};

const SamplePage =  ({ params: { collection_id } }: Props) => {
  const [sampleData, setSampleData] = useState<SamplesData[] | null>(null);
  const parsedCollectionId = parseInt(collection_id, 10);


  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-sky-400 to-sky-200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-1 text-3xl font-semibold">Samples Details</h1>
          <Link href='/'>Home</Link>
          <SamplesList collection_id={parsedCollectionId} />
        </div>
      </div>
    </div>
  );
}

  

export default SamplePage;