import { useState } from 'react';

const AddCollection = () => {
    const [title, setTitle] = useState('');
    const [disease, setDisease] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Call your API to add the new collection
        const response = await fetch('/api/add_collection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, disease }),
        });

        if (response.ok) {
            // Clear the form
            setTitle('');
            setDisease('');
        } else {
            console.error('Error adding collection');
            //add toast
        }
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
                            <button type="submit">Add Collection</button> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}
// refresh page after adding collection
export default AddCollection;