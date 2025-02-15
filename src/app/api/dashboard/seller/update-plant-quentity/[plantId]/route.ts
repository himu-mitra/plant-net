import connectDb from '@/lib/connectDb';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest, { params }: any) {
    const { plantId } = await params;
    const { quantityToUpdate, status } = await request.json();
    console.log("quantityToUpdate", quantityToUpdate, "status", status);

    if (!ObjectId.isValid(plantId)) {
        return NextResponse.json({ message: "Invalid plant ID" }, { status: 400 });
    }

    try {
        const { plantsCollection } = await connectDb();
        const filter = { _id: new ObjectId(plantId) };

        const updateDoc = {
            $inc: { quantity: status === "decrease" ? -quantityToUpdate : quantityToUpdate }
        };

        const result = await plantsCollection.updateOne(filter, updateDoc);
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
