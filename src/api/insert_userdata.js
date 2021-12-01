import { MongoClient } from "mongodb";
import assert from "assert";
import http from "http";
import url from "url";

const mongourl = 'mongodb+srv://jimmy:xzC659428@cluster0.hnqlx.mongodb.net/miniproject?retryWrites=true&w=majority';
const dbName = 'miniproject';
const client = new MongoClient(mongourl);


const DOC = [
    {
        "username": "david",
        "password": "abc"
    },
    {
        "username": "jimmy",
        "password": "abc"
    },
    {
        "username": "demo",
        "password": ""
    }
];

const insertDocument = (db, doc, callback) => {
    // db.users.remove();
    db.collection('users').
        insertMany(doc, (err, results) => {
            assert.equal(err, null);
            console.log(`Inserted document(s): ${results.insertedCount}`);
            callback();
        });
}

client.connect((err) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    insertDocument(db, DOC, () => {
        client.close();
        console.log("Closed DB connection");
    })
});