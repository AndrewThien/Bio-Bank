import { db } from "@/lib/db";
import { collections } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export const runtime = "edge";

export const POST = async (req: Request) => {

  try {
    const {collection_id} = await req.json();
    // declare the returned collection
    let _collections;
    // Based on the passed value of collection id to select all or one collection
    if (collection_id === -1) {
      _collections = await db
      .select()
      .from(collections);
    } else {
      _collections = await db
      .select()
      .from(collections)
      .where(eq(collections.id, collection_id));
    }
    return NextResponse.json(_collections);
  } catch (error: any) {
    console.log(error, "Fetching collections is going wrong")
    return NextResponse.json({error: "Fetching collections is going wrong"}, {status: 500}); 
  }
}