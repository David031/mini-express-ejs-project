import { ObjectId } from "mongodb";
import { client, dbName } from "./client.js";

export async function info(id) {
  try {
    await client.connect();
    const db = client.db(dbName);

    const inventory = db.collection("inventory");

    const query = { _id: ObjectId(id) };
    const data = await inventory.findOne(query);

    if (!data) {
      console.log("No documents found!");
    }
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}
