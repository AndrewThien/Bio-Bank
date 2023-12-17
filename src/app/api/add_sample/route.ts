import { db } from '@/lib/db';
import { samples } from '@/lib/db/schema';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export const POST = async (req: Request) => {
  try {
    const { collection_id, donor_count, material_type, last_updated } = await req.json();
    // Insert the values into the "collection" table
    await db.insert(samples).values({
      collection_id: collection_id,
      donor_count: donor_count,
      material_type: material_type,
      last_updated: last_updated,
    });

    return NextResponse.json({ message: 'Sample Data inserted successfully.' });
  } catch (error: any) {
    console.error('Error inserting data:', error);
    return NextResponse.json(
      { error: 'Error inserting sample data.'},
      { status: 500 }
    );
  }
};
