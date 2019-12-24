var express = require("express");
var router = express.Router();
var fs = require("fs");

// /projectsにgetでアクセスしてきたときの処理
router.get("/", function(req, res) {
  var usersText = fs.readFileSync("./views/users.json");
  var users = JSON.parse(usersText);
  var projects = [];
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (
      req.session.passport.user === user.username &&
      Array.isArray(user.projects)
    ) {
      projects = user.projects;
    }
  }

  res.render("projects", {
    title: "プロジェクト一覧",
    content: projects
  });
});

// /projects/postでアクセスしてきたときの処理
router.post("/", function(req, res) {
  var usersText = fs.readFileSync("./views/users.json");
  var users = JSON.parse(usersText);
  var projects = [];
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (
      req.session.passport.user === user.username &&
      Array.isArray(user.projects)
    ) {
      projects = user.projects;
    }
  }

  var id_data = projects[projects.length - 1].id;
  var newproject = {
    id: id_data + 1,
    name: req.body.projectname,
    description: "",
    feedbacks: ""
  };

  projects.push(newproject);
  var users_data = JSON.stringify(users);
  fs.writeFile("./views/users.json", users_data, "utf-8", function(err) {
    if (err) {
      throw err;
    }
  });
  res.redirect("/");
});

// /projects?id=(i+1)にgetでアクセスしてきたときの処理
router.get("/id", function(req, res) {
  var usersText = fs.readFileSync("./views/users.json");
  var users = JSON.parse(usersText);

  res.render("projects_details", {
    title: "Redlion",
    content: "users"
  });
});

module.exports = router;
