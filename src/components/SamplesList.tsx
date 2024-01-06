import { Button } from "./ui/button";
import { useQuery } from "react-query";
import axios from "axios";
import styles from '@/app/table.module.css';

// Define component property
type Props = { collection_id: number };

// Define the sample data type
interface SamplesData {
    id: number; 
    collection_id: number;
    donor_count: number;
    material_type: string; 
    last_updated: Date; 
  }

const SamplesList = ({ collection_id }: Props) => {
  
  // Use react-query and axios as query function to fetch sample data and reflect the changes in UI
  const { data } = useQuery({
    queryKey: 'samples',
    queryFn: async () => {
      const response = await axios.post<SamplesData[]>("/api/samples", {
        collection_id,
      });
      return response.data; // The process of fetching data is easier with axios 
    },
  });

  return (
    <div className="flex flex-col items-center text-center">
    <h1 className="mb-1 mt-5 text-2xl font-semibold">Samples Record Details</h1>
          {data && data.length > 0 ? (
            <div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Sample ID</th>
                    <th>Collection ID</th>
                    <th>Donor Count</th>
                    <th>Material Type</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((data) => (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.collection_id}</td>
                      <td>{data.donor_count}</td>
                      <td>{data.material_type}</td>
                      <td>{new Date(data.last_updated).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ): (<p>No Samples Record Found</p>)
          }
    </div>
    );
};

export default SamplesList;