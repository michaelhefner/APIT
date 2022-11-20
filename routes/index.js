var express = require('express');
var router = express.Router();
var db = require('../middleware/dbhandler');
const { requiresAuth } = require('express-openid-connect');
var path = require('path');


router.get('/', function(req, res, next) {
  console.log(req.oidc.isAuthenticated());
  res.send({authenticated: req.oidc.isAuthenticated(), user: req.oidc.user});
  // res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/isauth', function(req, res, next) {
  res.send({authenticated: req.oidc.isAuthenticated(), user: req.oidc.user});
});

router.get('/login', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/profile', requiresAuth(), (req, res) => {
  db.insert.user(req.oidc.user.nickname, req.oidc.user.email)
  res.sendFile(path.join(path.dirname(__dirname), '/public/profile.html'), {user: req.oidc.user});
});
router.get('/add-test', requiresAuth(), (req, res) => {
  console.log('user in add-test', req.oidc.user);
  db.insert.test("testname", "testdescription", "testtype", "testdata", "testresult", "teststatus", req.oidc.user.nickname, "testurl")
  res.sendFile(path.join(path.dirname(__dirname), '/public/add-test.html'), {user: req.oidc.user});
});
router.post('/add-test', requiresAuth(), (req, res) => {
  db.insert.test("testname", "testdescription", "testtype", "testdata", "testresult", "teststatus", req.oidc.user.nickname, "testurl")
  res.sendFile(path.join(path.dirname(__dirname), '/public/add-test.html'), {user: req.oidc.user});
});

router.get('/profile-info', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;
