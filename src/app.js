import express from "express";
import { login } from "./connect.js";

const app = express()
const port = 4000

app.get('/', (req, res) => {
  login("david","abc")
  res.status(200).send({start: 'Hello World!'})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})