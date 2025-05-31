const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = 3000;
const uri = "mongodb+srv://1848381:NW23QKosV49VkykX@customers.x8cjioe.mongodb.net/?retryWrites=true&w=majority&appName=Customers";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function start() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("customers");
        const collection = db.collection("customers");

        app.use(express.json());

        app.post("/item", async (req: { body: any; }, res: { json: (arg0: { insertedId: any; }) => void; }) => {
            const newItem = req.body;
            const result = await collection.insertOne(newItem);
            res.json({ insertedId: result.insertedId });
        });

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.error(err);
    }
}

start();
