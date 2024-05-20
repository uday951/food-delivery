"use strict";

var vendor = require('../models/vendor');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

var dotEnv = require('dotenv');

dotEnv.config();
var secretkey = process.env.MYNAME;

var vendorRegister = function vendorRegister(req, res) {
  var _req$body, email, username, password, vendorEmail, hashedPassword, newvendor;

  return regeneratorRuntime.async(function vendorRegister$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, username = _req$body.username, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(vendor.findOne({
            email: email
          }));

        case 4:
          vendorEmail = _context.sent;

          if (!vendorEmail) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json("email already taken"));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 9:
          hashedPassword = _context.sent;
          newvendor = new vendor({
            username: username,
            email: email,
            password: hashedPassword
          });
          _context.next = 13;
          return regeneratorRuntime.awrap(newvendor.save());

        case 13:
          res.status(201).json({
            message: "vendor register successfully"
          });
          console.log('registerd');
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          res.status(500).json({
            error: "internal server error"
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 17]]);
};

var vendorLogin = function vendorLogin(req, res) {
  var _req$body2, email, password, Vendor, token;

  return regeneratorRuntime.async(function vendorLogin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(vendor.findOne({
            email: email
          }));

        case 4:
          Vendor = _context2.sent;
          _context2.t0 = !Vendor;

          if (_context2.t0) {
            _context2.next = 10;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, Vendor.password));

        case 9:
          _context2.t0 = !_context2.sent;

        case 10:
          if (!_context2.t0) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            error: "invalid password"
          }));

        case 12:
          token = jwt.sign({
            vendorId: Vendor._id
          }, secretkey);
          res.status(200).json({
            success: "login successfully",
            token: token
          });
          console.log(email, "this is my token", token);
          _context2.next = 19;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t1 = _context2["catch"](1);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 17]]);
};

module.exports = {
  vendorRegister: vendorRegister,
  vendorLogin: vendorLogin
};