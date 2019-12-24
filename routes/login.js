var express = require("express");
var router = express.Router();
var fs = require("fs");

// loginにgetでアクセスしてきたときの処理//
router.get("/", function(req, res) {
  res.render("login", {
    title: "ログイン"
  });
});

// 認証の処理//
var passport = require("passport");
router.use(passport.initialize());
router.use(passport.session());

var LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy(function(username, password, done) {
    var usersText = fs.readFileSync("./views/users.json");
    var users = JSON.parse(usersText);
    var loginSucceed = false;
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      if (username === user.username && password === user.password) {
        loginSucceed = true;
      }
    }
    if (loginSucceed) {
      return done(null, username);
    } else {
      return done(null, false, { message: "ログインに失敗しました。" });
    }
  })
);

passport.serializeUser(function(username, done) {
  done(null, username);
});

passport.deserializeUser(function(username, done) {
  done(null, username);
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/projects",
    failureRedirect: "/login",
    session: true
  })
);

module.exports = router;
