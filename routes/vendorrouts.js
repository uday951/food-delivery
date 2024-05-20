const vendorcontroller = require("../controllers/vendorcontroller");
const express=require('express');
const router= express.Router();

router.post('/register',vendorcontroller.vendorRegister);
router.post('/Login',vendorcontroller.vendorLogin);
router.get('/all-vendors',vendorcontroller.getAllvendors)
router.get('/single-vendor/:id',vendorcontroller.getVendorById)
module.exports=router;