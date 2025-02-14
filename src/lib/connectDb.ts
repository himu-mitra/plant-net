import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.hmus9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let client: MongoClient | null = null;
let mitraMartDb: any = null;
let usersCollection: any = null;
let plantsCollection: any = null;
let ordersCollection: any = null;

export default async function connectDb() {
    if (!client) {
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });

        try {
            await client.connect();
            console.log("Connected to MongoDB successfully!");

            if (!mitraMartDb) {
                mitraMartDb = client.db("mitraMartDb");
            }

            if (!usersCollection) {
                usersCollection = mitraMartDb.collection("usersCollection")
            }
            if (!plantsCollection) {
                plantsCollection = mitraMartDb.collection("plants")
            }
            if (!ordersCollection) {
                ordersCollection = mitraMartDb.collection("orders")
            }


        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        }
    }

    return { client, mitraMartDb, usersCollection, plantsCollection, ordersCollection };
}
