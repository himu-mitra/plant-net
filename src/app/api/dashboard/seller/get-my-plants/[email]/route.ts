import connectDb from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}: any) {
    const {email} = await params;
    try {
        const {plantsCollection} = await connectDb();
        const result = await plantsCollection.find({"seller.email": email}).sort({ _id: -1 }).toArray()
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(error)
    }
}