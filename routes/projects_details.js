var express = require("express");
var router = express.Router();
var url = require("url");
var fs = require("fs");

router.get("/", function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var n = query.id;

  var text = fs.readFileSync("./views/users.json");
  var memos = JSON.parse(text);

  res.render("projects_details.ejs", {
    title: "プロジェクト詳細",
    url: "onclick=location.href='/projects?id=" + n + "'>",
    id: n
  });
});

module.exports = router;
