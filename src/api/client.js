import { MongoClient } from "mongodb";
import assert from "assert";

const url = 'mongodb+srv://jimmy:xzC659428@cluster0.hnqlx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
export const dbName = 'test';

export const client = new MongoClient(url);

