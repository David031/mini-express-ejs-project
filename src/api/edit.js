import { client, dbName } from "./client.js";
import { ObjectId } from "mongodb";
import factoryToDoc from "../utils/factoryToDoc.js";
export async function edit(id, data, manager) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const inventory = db.collection("inventory");
    const filter = { _id: ObjectId(id) };
    const doc = {
      $set: factoryToDoc(data, manager),
    };
    const result = await inventory.updateOne(filter, doc);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
    console.log(`Updated ${result.modifiedCount} documents`);
    if (result.matchedCount) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}
