"use strict";

var vendorcontroller = require("../controllers/vendorcontroller");

var express = require('express');

var router = express.Router();
router.post('/register', vendorcontroller.vendorRegister);
router.post('/Login', vendorcontroller.vendorLogin);
module.exports = router;