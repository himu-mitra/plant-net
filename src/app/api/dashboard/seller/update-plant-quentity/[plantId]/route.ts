import connectDb from '@/lib/connectDb';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
export async function PATCH(request: NextRequest, { params }: any) {
    const {plantId} = await params;
    const { quantityToUpdate } = await request.json()
    try {
        const { plantsCollection } = await connectDb();
        const filter = { _id: new ObjectId(plantId) }
        const updateDoc = {
            $inc: { quantity: -quantityToUpdate }
        }

        const result = await plantsCollection.updateOne(filter, updateDoc)
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}