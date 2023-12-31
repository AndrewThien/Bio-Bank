import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const AddCollection = () => {
  // Set query client
  const queryClient = useQueryClient();
  // Set states
  const [title, setTitle] = useState('');
  const [disease, setDisease] = useState('');

  // Set mutation function for adding collection and refetching
const mutation = useMutation(({ title, disease }: { title: string; disease: string }) => 
    fetch('/api/add_collection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, disease }),
    }), {
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('collections');
        toast.success('Collection added successfully');
    },
    onError: () => {
        console.error('Error adding collection');
        toast.error('Error adding collection');
    },
});
    // Handle form submit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Confirm with user then add collection and clear the form
    const userConfirmed = window.confirm('A new collection will be added to the Bio Bank. Are you sure to proceed?');
    if (userConfirmed) {
    mutation.mutate({ title, disease });
    // Clear the form
    setTitle('');
    setDisease('');
    }
  };
    // Return the form component
    return (
        <form onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'center' }}>
                            <label>Collection Title:</label>
                        </td>
                        <td>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'center' }}>
                            <label>Associated Disease:</label>
                        </td>
                        <td>
                            <input type="text" value={disease} onChange={e => setDisease(e.target.value)} required />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Button type="submit" className='mt-3 mb-5 text-sm'>Add Collection<PlusCircle className='ml-2'/></Button> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}

export default AddCollection;