import factoryToDoc from "../utils/factoryToDoc.js";
import { client, dbName } from "./client.js";

export async function create(data, manager) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const inventory = db.collection("inventory");
    const result = await inventory.insertOne(factoryToDoc(data, manager));
    console.log(
      `[Inventory Create]: document ${result.insertedId} were inserted`
    );
    if (!!result.insertedId) {
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
