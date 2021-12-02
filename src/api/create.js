import factoryToDoc from "../utils/factoryToDoc.js";
import { client, dbName } from "./client.js";

export async function create(data, manager) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const inventory = db.collection("inventory");

    const result = await inventory.insertOne(factoryToDoc(data, manager));
    console.log(
      `[Inventory Create]: ${result.insertedCount} documents were inserted`
    );
    if (result.insertedCount == 1) {
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
