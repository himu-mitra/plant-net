import connectDb from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
    const { email } = await params;
    try {
        const { ordersCollection } = await connectDb()
        const query = { "customer.email": email }
        const result = await ordersCollection
            .aggregate([
                { $match: query },
                { $addFields: { plantId: { $toObjectId: "$plantId" } } },
                { $lookup: { from: "plants", localField: "plantId", foreignField: "_id", as: "plants" } },
                { $unwind: "$plants" },
                { $addFields: { name: "$plants.name", image: "$plants.image", category: "$plants.category" } },
                { $project: { plants: 0 } }])
            .toArray();
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}