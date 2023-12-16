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

    return NextResponse.json({ message: 'Data inserted successfully.' });
    // toast
  } catch (error: any) {
    console.error('Error inserting data:', error);
    return NextResponse.json(
      { error: 'Error inserting data.'},
      { status: 500 }
    );
  }
};
