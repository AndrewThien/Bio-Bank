import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

type Props = { collection_id: number };

interface SamplesData {
    collection_id: number;
    donor_count: number;
    material_type: string; 
    last_updated: string; 
  }

const AddSample = ({collection_id}: Props) => {
  const queryClient = useQueryClient();

  const [donorCount, setDonorCount] = useState(0);
  const [materialType, setMaterialType] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  const mutation = useMutation((newSample: SamplesData) => fetch('/api/add_sample', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newSample),
  }), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('samples');
      toast.success('Sample added successfully');
    },
    onError: () => {
      console.error('Error adding sample');
      toast.error('Error adding sample');
    }
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    mutation.mutate({ collection_id: collection_id, donor_count: donorCount, material_type: materialType, last_updated: lastUpdated });

    // Clear the form
    setDonorCount(0);
    setMaterialType('');
    setLastUpdated('');
  };

    return (
        <form onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'left' }}>
                            <label>Donor count:</label>
                        </td>
                        <td>
                            <input type="number" value={donorCount} onChange={e => setDonorCount(Number(e.target.value))} required />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'left' }}>
                            <label>Material Type:</label>
                        </td>
                        <td>
                            <input type="text" value={materialType} onChange={e => setMaterialType(e.target.value)} required />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'left' }}>
                            <label>Last updated on:</label>
                        </td>
                        <td>
                            <input type="date" value={lastUpdated} onChange={e => setLastUpdated(e.target.value)} required />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                        <Button type="submit" className='mt-3 text-sm'>Add Sample<PlusCircle className='ml-2'/></Button> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
};

export default AddSample;