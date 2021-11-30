import { client, dbName } from "./client.js";

export async function create(data) {
    const { id, name, type, quantity, photo, photo_mimetype, address, manager } = data;
    try {
        await client.connect();
        const db = client.db(dbName);
        updata = data.toArray();
        const inventory = db.collection("inventory");




        const Doc = [{

            name: name,
            type: type,
            quantity: quantity,
            photo: photo,
            photo_mimetype: photo_mimetype,
            address: address,
            manager: manager
        }];
        const options = { ordered: true };
        const result = await inventory.insertMany(docs, options);
        console.log(`${result.insertedCount} documents were inserted`);

        if (result.insertedCount) {
            return true;
        } else { return false; }


    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}
