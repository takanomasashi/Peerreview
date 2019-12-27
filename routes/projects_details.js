var express = require("express");
var router = express.Router();
var url = require("url");
var fs = require("fs");

router.get("/", function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var n = query.id;

  var text = fs.readFileSync("./views/users.json");
  var users = JSON.parse(text);

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

  var projects_name = "";
  for (var j = 0; j < projects.length; j++) {
    if (n == projects[j].id) {
      projects_name = projects[j].name;
    }
  }

  res.render("projects_details.ejs", {
    title: projects_name,
    url: "onclick=location.href='/projects?id=" + n + "'>",
    id: n
  });
});

module.exports = router;
