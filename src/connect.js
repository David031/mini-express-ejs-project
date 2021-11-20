import { MongoClient } from "mongodb";
import assert from "assert";

const url = 'mongodb+srv://jimmy:xzC659428@cluster0.hnqlx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName = 'test';

const client = new MongoClient(url);



export function login(name, password) {

    client.connect((err) => {
        assert.equal(null, err);

        console.log("Connected successfully to server");

        const db = client.db(dbName);
        /*
        * CRUD Operations */
        client.close();
    });

}


