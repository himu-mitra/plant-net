import connectDb from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const userInfo = await req.json();
        console.log(userInfo)
        const { name, email, password = "halum", provider = "credentials", image = "https://res.cloudinary.com/dnr1svamu/image/upload/v1739601314/placeholder_c0lj2n.jpg" } = userInfo;
        const { usersCollection } = await connectDb();
        const query: any = { email };
        const existingUser = await usersCollection.findOne(query);

        if (existingUser) {
            return NextResponse.json({ message: "User already exists", success: true }, { status: 200 });

        }

        const newUser = await usersCollection.insertOne({
            name,
            email,
            gender: "N/A",
            password,
            provider,
            role: "customer",
            image,
            resetPassOtp: "N/A",
            isVerified: false,
            timestamp: Date.now(),
        });

        if (newUser.insertedId) {
            return NextResponse.json({ message: "New user created", success: true }, { status: 200 });
        }

        return NextResponse.json({ message: "User creation failed", success: false }, { status: 500 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}
