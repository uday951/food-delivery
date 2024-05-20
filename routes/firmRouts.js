const express=require("express");
const firmcontroller=require("../controllers/firmcontroller");
const verifyToken = require("../middleware/verifyToken")


const router=express.Router()

router.post('/add-firm',verifyToken,firmcontroller.addFirm)

router.get('/upoads/:imageName',(req,res)=>{
    const imagName=req.params.imageName;
    res.headerssent('content-Type','image/jpeg');
    res. sendDate(path.join(__dirname,'..',imageName));
});


router.delete('/firmId',firmcontroller.deletFirmById)

module.exports=router