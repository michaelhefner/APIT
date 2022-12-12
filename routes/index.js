var express = require("express");
var router = express.Router();
var db = require("../middleware/dbhandler");
const { requiresAuth } = require("express-openid-connect");
var path = require("path");
const https = require("http");

router.get("/", function (req, res, next) {
  console.log(req.oidc.isAuthenticated());
  res.send({ authenticated: req.oidc.isAuthenticated(), user: req.oidc.user });
  // res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get("/isauth", function (req, res, next) {
  res.send({ authenticated: req.oidc.isAuthenticated(), user: req.oidc.user });
});

router.get("/login", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

router.get("/profile", requiresAuth(), (req, res) => {
  console.log(req.oidc.user);
  db.insert.user(req.oidc.user.nickname, req.oidc.user.email);
  res.locals.user = req.oidc.user;
  res.sendFile(path.join(path.dirname(__dirname), "/public/profile.html"), {
    user: req.oidc.user,
  });
});
router.get("/add-test", requiresAuth(), (req, res) => {
  res.sendFile(path.join(path.dirname(__dirname), "/public/add-test.html"));
});
router.post("/send-test", requiresAuth(), (req, res) => {
  console.log(req.body);
  https.get(req.body.url, (resp) => {
    let data = "";
    resp.on("data", (chunk) => {
      data += chunk;
    });
    resp.on("end", () => {
      // console.log(data);  
      res.send({ data: data });
    });
  });
  // res.sendFile(path.join(path.dirname(__dirname), '/public/add-test.html'));
});
router.post("/add-test", (req, res) => {
  console.log(req);
  // db.insert.test(req.body.name, req.body.description, req.body.method, req.body.body, req.body.headers, req.body.status, req.oidc.user.nickname, req.body.url);
  res.json(req.body);
  // res.sendFile(path.join(path.dirname(__dirname), '/public/add-test.html'), {user: req.oidc.user});
});

router.post("/test", (req, res) => {
  console.log(req);
  res.send("test added");
});
router.post("/profile-info", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;
