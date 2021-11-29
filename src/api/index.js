import { MongoClient } from "mongodb";
import assert from "assert";
import { name } from "ejs";

const url = 'mongodb+srv://jimmy:xzC659428@cluster0.hnqlx.mongodb.net/miniproject?retryWrites=true&w=majority';
const dbName = 'miniproject';

const client = new MongoClient(url);
const criteria = {};

const findDocument = (db, criteria, callback) => {
    let cursor = db.collection('inventory').find(criteria);
    cursor.toArray((err, docs) => {
        assert.equal(null, err);
        callback(docs);
    })
}




export function login(name, password) {

    const client = new MongoClient(mongourl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        findDocument(db, criteria, (docs) => {
            client.close();
            console.log("Closed DB connection");
            res.writeHead(200, { "content-type": "text/html" });
            res.write(`<html><body><H2>Inventorys (${docs.length})</H2><ul>`);
            for (var doc of docs) {
                //console.log(doc);
                res.write(`<li>Inventory ID: <a href="/details?_id=${doc._id}">${doc.id}</a></li>`);
            }
            res.end('</ul></body></html>');
        });
    });

}


