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

  var projects_data = "";
  for (var j = 0; j < projects.length; j++) {
    projects_data =
      projects_data +
      "<li><a href='/projects_details?id=" +
      projects[j].id +
      "'>" +
      projects[j].name +
      "</a></li>";
  }

  res.render("projects", {
    title: "プロジェクト一覧",
    projects: projects_data
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
  res.redirect("/projects");
});

module.exports = router;
