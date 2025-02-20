import connectDb from "@/lib/connectDb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: any) {
    const { plantId } = await params;
    try {
        const { plantsCollection } = await connectDb();
        const query = { _id: new ObjectId(plantId) }
        const result = await plantsCollection.deleteOne(query)
        
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Plant not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Plant deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 });
    }
}