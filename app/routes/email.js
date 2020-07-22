var express = require("express");
var router = express.Router();

var email = require("../common/email");
router.post("/", email.sendEmail);
module.exports = router; // esto exporta el modulo