import connectDb from "@/lib/connectDb";
import { mailSend } from "@/lib/mailSend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const orderDetails = await request.json();
    console.log("orderDetails-----", orderDetails)
    try {
        const {ordersCollection} = await connectDb();
        const result = await ordersCollection.insertOne(orderDetails)
        if (result?.insertedId) {
            const mailData = {
                address: orderDetails.customer.email,
                subject: "Order Successfull",
                body: "You have placed an order successfully."
            }

            await mailSend(mailData)
        }
        
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}