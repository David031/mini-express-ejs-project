import { client, dbName } from "./client.js";
import { ObjectId } from "mongodb";
export async function remove(id) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const inventory = db.collection("inventory");
    const query = { _id: ObjectId(id) };
    const result = await inventory.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
      return true;
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}
