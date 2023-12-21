import { db } from "@/lib/db";
import { samples } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

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
    NextResponse.json(
      {error: "internal server error"},
      {status: 500});
  }
};


