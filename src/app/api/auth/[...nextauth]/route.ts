import connectDb from "@/lib/connectDb";
import axios from "axios";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                email: { label: "Email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // console.log("credentials", credentials)

                if (credentials?.email) {
                    const { email } = credentials;
                    // console.log("email --", email);
                    try {
                        const { usersCollection } = await connectDb();
                        const user = await usersCollection.findOne({ email });
                        if (user) {
                            console.log(user);
                            return user
                        } else {
                            return null
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],

    pages: {
        signIn: "/login",
    },

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async signIn({ user, account }) {

            if (account) {
                const { provider } = account;
                const { name, email, image } = user;
                const userInfo = {
                    name,
                    email,
                    provider,
                    image,
                }

                try {
                    const { usersCollection } = await connectDb();
                    const query: any = { email };
                    const existingUser = await usersCollection.findOne(query);
                    if (!existingUser) {
                        await axios.post(`${process.env.NEXTAUTH_URL}/api/register`, userInfo);
                    }

                } catch (error) {
                    console.log(error);
                }
            }

            return true;
        },

        async jwt({ token }) {
            if (token) {
                const email = token.email;
                try {
                    const { usersCollection } = await connectDb();
                    const query: any = { email };
                    const existingUser = await usersCollection.findOne(query);
                    console.log("existingUser -----", existingUser)
                    if (!existingUser) {
                        token.tokenExpired = true;
                    } else {
                        token.name = existingUser.name;
                        token.email = existingUser.email;
                        token.role = existingUser.role;
                        token.image = existingUser.image;
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                // console.log("token", token);
                session.user = {
                    id: token.id as string,
                    name: token.name,
                    email: token.email,
                    role: token.role as string,
                    image: token?.image as string,
                    // tokenExpired: token?.tokenExpired as boolean || false 
                };
            }
            return session;
        },

    },
})

export { handler as GET, handler as POST }


