var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/new", function(req, res) {
  res.render("users", { title: "ユーザー登録" });
});

module.exports = router;
