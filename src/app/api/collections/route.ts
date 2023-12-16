import { db } from "@/lib/db";
import { collections } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export const runtime = "edge";

export const GET = async (req: Request) => {

  try {

    const _collections = await db
    .select()
    .from(collections);

    return NextResponse.json(_collections);
  } catch (error: any) {
    console.log(error, "Fetching collections is going wrong")
    return NextResponse.json({error: "Fetching collections is going wrong"}, {status: 500}); 
  }
}