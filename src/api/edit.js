import { client, dbName } from "./client.js";
import { ObjectId } from "mongodb";
export async function edit(data) {

    console.log("data", data);
    const { _id, name, type, quantity, photo, photo_mimetype, address, manager } = data;
    console.log(_id);
    try {
        await client.connect();
        const db = client.db(dbName);

        const inventory = db.collection("inventory");

        const filter = { _id: ObjectId(_id) };
        console.log(filter);

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

        const result = await inventory.updateOne(filter, updateDoc);
        console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,);
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
