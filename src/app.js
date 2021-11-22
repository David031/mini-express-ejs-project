import express from "express";
import { login } from "./connect.js";
const app = express()
const port = 4000

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  var mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];
  var tagline = "No programming concept is complete without a cute animal mascot.";

  res.render('pages/main', {
    mascots: mascots,
    tagline: tagline
  });
});

app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
