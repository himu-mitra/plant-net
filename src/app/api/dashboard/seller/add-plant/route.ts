import connectDb from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const plantData = await request.json();
    try {
        const { plantsCollection } = await connectDb()
        const result = await plantsCollection.insertOne(plantData)
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}