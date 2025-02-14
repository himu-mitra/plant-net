import connectDb from "@/lib/connectDb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
    const { plantId } = await params;
    try {
        const query = { _id: new ObjectId(plantId) }
        const { plantsCollection } = await connectDb();
        const result = await plantsCollection.findOne(query)
        return NextResponse.json(result, {status: 200})
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}