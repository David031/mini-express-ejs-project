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
    const response = await cursor.toArray();
    const data = response.map((ele) => ({ id: ele._id.toString(), ...ele }));
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}
