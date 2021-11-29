import express from "express";
import bodyParser from "body-parser";
import { login } from "./api/login.js";
const app = express();
const port = 4000;

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  var mascots = [
    { name: "Sammy", organization: "DigitalOcean", birth_year: 2012 },
    { name: "Tux", organization: "Linux", birth_year: 1996 },
    { name: "Moby Dock", organization: "Docker", birth_year: 2013 },
  ];
  var tagline =
    "No programming concept is complete without a cute animal mascot.";

  res.render("pages/main", {
    mascots: mascots,
    tagline: tagline,
  });
});

app.get("/about", function (req, res) {
  res.render("pages/about");
});

app.get("/login", function (req, res) {
  res.render("pages/login",{isInValid: false});
});

app.post("/login", async function (req, res) {
  const { username, password } = req.body;
  if (await login(username, password)) {
    res.render("pages/inventory/index", { username: username });
  }else{
    res.render("pages/login",{isInValid: true});
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
