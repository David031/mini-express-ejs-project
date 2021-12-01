import { client, dbName } from "./client.js";

export async function login(name, password) {
  try {
    await client.connect();
    const db = client.db(dbName);

    const users = db.collection("users");

    const cursor = users.find();

    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }
    const data = await cursor.toArray();
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (name == element.username && password == element.password) {
        return element._id.toString();
      }
    }

    return null;
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}
