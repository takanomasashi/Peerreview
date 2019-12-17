var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
url = require("url");
var fs = require("fs");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

//HOMEにgetでアクセスしてきたときの処理//
router.get("/", function(req, res) {
  res.render("index.ejs", {
    title: "Classi Peer Review",
    subtitle: "プロジェクトメンバーから簡単にフィードバックをもらえるアプリ"
  });
});

//HOMEにpostでアクセスしてきたときの処理//
router.post("/", function(req, res) {
  var usersText = fs.readFileSync("./views/users.json");
  var users = JSON.parse(usersText);
  var id_data = users[users.length - 1].id;
  var tmp = {
    id: id_data + 1,
    username: req.body.username,
    password: req.body.password
  };

  users.push(tmp);
  var users_data = JSON.stringify(users);
  fs.writeFile("./views/users.json", users_data, "utf-8", function(err) {
    if (err) {
      throw err;
    }
  });
  res.redirect("/");
});

module.exports = router;
