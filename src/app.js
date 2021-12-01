import express from "express";
import bodyParser from "body-parser";
import { login } from "./api/login.js";
import session from "express-session";
import { list } from "./api/list.js";
const app = express();
const port = 4000;
const sessionKey = "skey";

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    name: sessionKey,
    secret: "secMiniProject",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
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
  const { session } = req;
  if (session.isAuth) {
    res.redirect("/inventory/index");
  } else {
    res.render("pages/login", { isInValid: false });
  }
});

app.post("/login", async function (req, res) {
  const { session } = req;
  const { username, password } = req.body;
  const userId = await login(username, password);
  console.log("userId", userId);
  if (userId) {
    session.regenerate((err) => {
      if (err) {
        console.error(err);
      }
      req.session.userId = userId;
      req.session.username = username;
      req.session.isAuth = true;
      res.redirect("/inventory/index");
    });
  } else {
    res.render("pages/login", { isInValid: true });
  }
});

app.get("/inventory/index", async function (req, res) {
  const { session } = req;
  if (!session.isAuth) {
    res.redirect("/login");
  } else {
    const data = await list();
    res.render("pages/inventory/index", {
      username: session.username,
      data: data,
    });
  }
});

app.post("/inventory/create", async function (req, res) {
  const data = req.body;
  const { session } = req;
  if (!session.isAuth) {
    res.redirect("/login");
  } else {
    console.log("data", data);
    res.render("pages/inventory/index", { username: session.username });
  }
});

app.get("/inventory/create", async function (req, res) {
  const { session } = req;
  if (!session.isAuth) {
    res.redirect("/login");
  } else {
    res.render("pages/inventory/inventory_create", {
      username: session.username,
    });
  }
});

app.get("/logout", function (req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return;
    }
    res.clearCookie(sessionKey);
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
