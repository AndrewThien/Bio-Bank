import { useState } from 'react';
import toast from 'react-hot-toast';

type Props = { collection_id: number };


const AddSample = ({collection_id}: Props) => {

    const [donorCount, setDonorCount] = useState('');
    const [materialType, setMaterialType] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await fetch('/api/add_sample', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ collection_id: parseInt(collection_id), donor_count: parseInt(donorCount), material_type: materialType }),
        });

        if (response.ok) {
            // Clear the form
            setDonorCount('');
            setMaterialType('');
            toast.success('Sample added successfully');
        } else {
            console.error('Error adding sample');
            toast.error('Error adding sample');
        }
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
                            <input type="number" value={donorCount} onChange={e => setDonorCount(e.target.value)} required />
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
                        <td colSpan={2}>
                            <button type="submit">Add Sample</button> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
};

export default AddSample;