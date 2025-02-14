import connectDb from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const orderDetails = await request.json();
    try {
        const {ordersCollection} = await connectDb();
        const result = await ordersCollection.insertOne(orderDetails)
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}