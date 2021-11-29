import { client, dbName } from "./client.js";

export function login(name, password) {
  try {
    await client.connect();
    const db = client.db(dbName);

    client.close();
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}
