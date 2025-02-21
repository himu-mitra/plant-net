import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const {plantsCollection} = await connectDb();
        const result = await plantsCollection.find({}).sort({ _id: -1 }).toArray();
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({message: error})
    }
}