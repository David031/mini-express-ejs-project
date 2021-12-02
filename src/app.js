import bodyParser from "body-parser";
import express from "express";
import session from "express-session";
import { create } from "./api/create.js";
import { edit } from "./api/edit.js";
import { info } from "./api/info.js";
import { list } from "./api/list.js";
import { login } from "./api/login.js";
import { remove } from "./api/remove.js";
import capitalizeFirstLetter from "./utils/capitalizeFirstLetter.js";
import factoryToData from "./utils/factoryToData.js";

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
  res.render("pages/main");
});

app.get("/test", function (req, res) {
  const data = {
    _id: "61a20e3f15c6335af430f12a",
    name: "david",
    type: "user",
    quantity: "",
    photo: "aba",
    photo_mimetype: "jpg",
    address: {
      street: "aberdeen",
      building: "bububu",
      country: "Hong Kong",
      zipcode: "ac",
      coord: "",
    },
    manager: "jimmy",
  };
  edit(data);
});

app.get("/test2", function (req, res) {
  list();
  res.write("abc");
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

app.get("/inventory/search", async function (req, res) {
  const { session } = req;
  if (!session.isAuth) {
    res.redirect("/login");
  } else {
    const query = req.query.search;
    if (query != "" && query != null) {
      const data = await list();
      const filtered = data.filter((item) => item.name.includes(query));
      res.render("pages/inventory/index", {
        username: session.username,
        data: filtered,
      });
    } else {
      res.redirect("/inventory/index");
    }
  }
});

app.get("/inventory/info", async function (req, res) {
  const { session } = req;
  if (!session.isAuth) {
    res.redirect("/login");
  } else {
    const id = req.query.id;
    const isInValid = req.query.isInValid;
    const data = await info(id);
    const format_data = factoryToData(data);
    res.render("pages/inventory/inventory_info", {
      username: session.username,
      data: format_data,
      capitalizeFirstLetter,
      id,
      isInValid: isInValid ?? false,
      isInValidCoord: !(!!format_data.latitude && !!format_data.longitude),
    });
  }
});

app.get("/inventory/create", async function (req, res) {
  const { session } = req;
  if (!session.isAuth) {
    res.redirect("/login");
  } else {
    res.render("pages/inventory/inventory_create", {
      isInValid: false,
    });
  }
});

app.post("/inventory/create", async function (req, res) {
  const data = req.body;
  const { session } = req;
  if (!session.isAuth) {
    res.redirect("/login");
  } else {
    const response = await create(data, session.username);
    if (response) {
      res.render("pages/inventory/inventory_create", {
        isInValid: true,
      });
    } else {
      res.redirect("/inventory/index");
    }
  }
});
app.get("/inventory/edit", async function (req, res) {
  const { session } = req;
  if (!session.isAuth) {
    res.redirect("/login");
  } else {
    const id = req.query.id;
    const isInValid = req.query.isInValid;
    const data = await info(id);
    res.render("pages/inventory/inventory_edit", {
      isInValid: isInValid ?? false,
      data: factoryToData(data),
      id,
    });
  }
});

app.post("/inventory/edit", async function (req, res) {
  const data = req.body;
  const { session } = req;
  if (!session.isAuth) {
    res.redirect("/login");
  } else {
    const id = data.id;
    const response = await edit(id, data, session.username);
    if (response) {
      res.redirect(`/inventory/info?id=${id}`);
    } else {
      res.redirect(`/inventory/info?id=${id}&isInValid=true`);
    }
  }
});

app.post("/inventory/delete", async function (req, res) {
  const data = req.body;
  const { session } = req;
  if (!session.isAuth) {
    res.redirect("/login");
  } else {
    const id = data.id;
    const response = await remove(id);
    if (response) {
      res.redirect(`/inventory/index`);
    } else {
      res.redirect(`/inventory/info?id=${id}&isInValid=true`);
    }
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

app.get("*", function (req, res) {
  res.send("404 Error -- Page not found !", 404);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
