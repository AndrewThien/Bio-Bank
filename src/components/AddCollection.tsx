import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const AddCollection = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [disease, setDisease] = useState('');

const mutation = useMutation(async ({ title, disease }: { title: string; disease: string }) => {
    const response = await fetch('/api/add_collection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, disease }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}, {
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    mutation.mutate({ title, disease });

    // Clear the form
    setTitle('');
    setDisease('');
  };

    return (
        <form onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'left' }}>
                            <label>Title:</label>
                        </td>
                        <td>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'left' }}>
                            <label>Associated Disease:</label>
                        </td>
                        <td>
                            <input type="text" value={disease} onChange={e => setDisease(e.target.value)} required />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Button type="submit" className='mt-3 text-sm'>Add Collection<PlusCircle className='ml-2'/></Button> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}

export default AddCollection;