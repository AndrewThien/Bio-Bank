import { Button } from '@/components/ui/button';
import { useQuery } from 'react-query';
import Link from 'next/link';
import styles from '@/app/table.module.css';
import toast from "react-hot-toast";
import LoadingPage from '@/components/LoadingPage';
import axios from 'axios';
import { useEffect } from 'react';

// Define component's property
type Props = {
    collection_id : number,
    onLoading: (isLoading: boolean) => void};

// Define the collection data type
interface CollectionData {
    id: number; 
    title: string; 
    disease: string; 
    created_at: Date;
  }

const CollectionList = ({collection_id, onLoading} : Props) => {
  // Use react-query and axios to fetch collection data and reflect the changes in UI
  const { data: collectionData, isLoading } = useQuery({
    queryKey: 'collections',
    queryFn: async () => {
        try {
            const response = await axios.post<CollectionData[]>('/api/collections',{
                collection_id,
            });
            return response.data;
        } catch (error: any) {
            toast.error('Error loading collections');
        }
    },
    // Depend on the fetching result to set loading state
    onSuccess: () => onLoading(false),
    onError: () => onLoading(true),
  });

  // useEffect to update loading state
  useEffect(() => {
    onLoading(isLoading);
  }, [isLoading, onLoading]);

  // If loading, show loading page
  if (isLoading) {
    return <LoadingPage />;
  }
  
  return (
    <>
    {collectionData && (
        <div>
          <h1 className="mb-3 mt-5 text-2xl font-semibold text-center">
            {collection_id !== -1 ? 'Collection Details': 'Collection List'}
            </h1>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Collection Title</th>
                <th>Associated Disease</th>
                <th>Created on</th>
              </tr>
            </thead>
            <tbody>
              {collectionData.map((collection) => (
                <tr key={collection.id}>
                  <td>{collection.id}</td>
                  <td>
                  {/* Link every collection title to its manage page if collection_id equals -1*/}
                  {collection_id !== -1 ? collection.title : 
                  <Link key={collection.id} href={`/manage/${collection.id}`}>
                  <button className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                    <p>
                      {collection.title}
                    </p>
                  </button>
                </Link>}
                  </td>
                  <td>{collection.disease}</td>
                  <td>{new Date(collection.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>  
  )
}

export default CollectionList;