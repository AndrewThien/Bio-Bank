import { db } from "@/lib/db";
import { samples } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

// Define the function for the GET method
export const POST = async (req: Request) => {
  try {
    const { collection_id }  = await req.json();
    const _samples = await db
      .select()
      .from(samples)
      .where(eq(samples.collection_id, collection_id));

    return NextResponse.json(_samples);
  } catch (error: any) {
    console.error(error, "Fetching samples is going wrong");
    return NextResponse.error({ status: 500, message: 'An error occurred while fetching samples' });
  }
};


