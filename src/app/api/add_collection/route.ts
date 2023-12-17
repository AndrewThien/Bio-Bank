import { db } from '@/lib/db';
import { collections } from '@/lib/db/schema';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export const POST = async (req: Request) => {
  try {
    const { title, disease } = await req.json();
    // Insert the values into the "collection" table
    await db.insert(collections).values({
      title: title,
      disease: disease,
    });

    return NextResponse.json({ message: 'Collection data inserted successfully.' });
  } catch (error: any) {
    console.error('Error inserting collection data:', error);
    return NextResponse.json(
      { error: 'Error inserting collection data.'},
      { status: 500 }
    );
  }
};
