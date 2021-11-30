import { client, dbName } from "./client.js";

export async function edit(data) {
    const { id, name, type, quantity, photo, photo_mimetype, address, manager } = data;
    try {
        await client.connect();
        const db = client.db(dbName);

        const inventory = db.collection("inventory");

        const filter = { _id: `ObjectId(${id})` };


        const updateDoc = {
            $set: {
                name: name,
                type: type,
                quantity: quantity,
                photo: photo,
                photo_mimetype: photo_mimetype,
                address: address,
                manager: manager
            }
        };

        const result = await inventory.updateMany(filter, updateDoc);
        console.log(`Updated ${result.modifiedCount} documents`)

        if (result.modifiedCount) {
            return true;
        } else { return false; }


    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}
