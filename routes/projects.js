var express = require("express");
var router = express.Router();
var fs = require("fs");

// /projectsにpostでアクセスしてきたときの処理
//この下は今は1つめのプロジェクトを表示しているが、ユーザー情報からプロジェクトを一覧で表示させる//
router.post("/", function(req, res) {
  var usersText = fs.readFileSync("./views/users.json");
  var users = JSON.parse(usersText);
  var projects = users[0].projects;
  var projects_name = projects[0].name;

  var tmp = {
    username: req.body.username,
    password: req.body.password
  };

  res.render("projects", { title: "プロジェクト一覧", content: projects_name });
});

// /projects/newにgetでアクセスしてきたときの処理
router.get("/new", function(req, res) {
  res.render("projects_new", { title: "○○さんに対するFeedback" });
});

module.exports = router;
