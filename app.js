var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var projectsRouter = require("./routes/projects");
var projectsdetailsRouter = require("./routes/projects_details");
var bodyParser = require("body-parser");

var sessionCheck = function(req, res, next) {
  // console.log()
  if (req && req.session && req.session.passport && req.session.passport.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/login", loginRouter);
app.use("/", sessionCheck, indexRouter);
app.use("/users", usersRouter);
app.use("/projects", projectsRouter);
app.use("/projects_details", projectsdetailsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
