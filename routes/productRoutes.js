const express= require('express');
const productycontroller= require("../controllers/productcontroller");

const router=express.Router();

router.post('/add-product/:firmId',productycontroller.addproduct);
router.get('/:firmId/products',productycontroller.getproductByFirm);
router.get('/upoads/:imageName',(req,res)=>{
    const imagName=req.params.imageName;
    res.headerssent('content-Type','image/jpeg');
    res. sendDate(path.join(__dirname,'..',imageName));
});


router.delete('/:productId',productycontroller.deletProductById);


module.exports=router;