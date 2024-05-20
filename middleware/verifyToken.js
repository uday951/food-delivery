const vendor=require("../models/vendor");

const jwt=require("jsonwebtoken");

const dotEnv=require("dotenv");

dotEnv.config();

const secretkey = process.env.MYNAME

const verifyToken=async(req,res,next)=>{
    const token = req.headers.token;


    if(!token){
        return res.status(402).json({error:"token required"});
    }

    try {
        const decoded=jwt.verify(token,secretkey);
        const Vendor=await vendor.findById(decoded.vendorId);
        if(!Vendor){
            return res.status(401).json({error:"vendor not found"})
        }
        req.vendorId=Vendor._id

        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"invalid token"});
    }

}

module.exports = verifyToken