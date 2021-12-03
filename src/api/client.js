import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://jimmy:xzC659428@cluster0.hnqlx.mongodb.net/miniproject?retryWrites=true&w=majority";
export const dbName = "miniproject";

export const client = new MongoClient(url);
