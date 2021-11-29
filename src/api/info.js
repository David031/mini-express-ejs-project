import { client, dbName } from "./client.js";

export async function inventoryinfo(id) {
    try {
        await client.connect();
        const db = client.db(dbName);

        const inventory = db.collection("inventory");

        const query = { _id: `ObjectId(${id})` };

        const cursor = inventory.find(query);

        if ((await cursor.count()) === 0) {
            console.log("No documents found!");
        }
        const data = await cursor.toArray();
        console.log("data", data);


        return data;

    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}
