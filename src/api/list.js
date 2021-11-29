import { client, dbName } from "./client.js";

export async function list() {
  try {
    await client.connect();
    const db = client.db(dbName);

    const inventory = db.collection("inventory");

    const cursor = inventory.find();

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
