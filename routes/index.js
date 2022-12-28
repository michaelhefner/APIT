var express = require("express");
var router = express.Router();
var db = require("../middleware/dbhandler");
const { requiresAuth } = require("express-openid-connect");
var path = require("path");
const https = require("https");
const http = require("http");
const pretty = require('pretty');

router.get("/", function (req, res, next) {
  console.log(req.oidc.isAuthenticated());
  res.render("index", {
    authenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});

router.get("/isauth",function (req, res, next) {
  console.log(req.oidc.user);
  res.send({ authenticated: req.oidc.isAuthenticated(), user: req.oidc.user });
});

router.get("/login", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

router.get("/profile", requiresAuth(), (req, res) => {
  console.log(req.oidc.user);
  db.insert.user(req.oidc.user.nickname, req.oidc.user.email);

  res.render("profile", { user: req.oidc.user });
});

router.get("/add-test", requiresAuth(), (req, res) => {
  res.render("add-test", { user: req.oidc.user });
});

router.post("/send-test", requiresAuth(), (req, res) => {
  console.log(req.body.url, req.body.url.toLowerCase().indexOf("https"));
  if (req.body.url) {
    if (req.body.url.toLowerCase().indexOf("https") === -1) {
      console.log("http");
      http.get(req.body.url.toLowerCase(), (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk.toString();
        });
        resp.on("end", () => {
          res.send({ data: `${pretty(data.toString())}` });
        });
      });
    } else {
      console.log("https");
      https.get(req.body.url.toLowerCase(), (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk.toString();
        });
        resp.on("end", () => {
          // res.render('result', { data: data });
          res.send({ data: `${pretty(data.toString())}` });
        });
      });
    }
  }
});

router.post("/add-test", requiresAuth(), (req, res) => {
  res.json(req.body);
});

router.get("/profile-info", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;
