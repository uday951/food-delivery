const vendor = require('../models/vendor');

const jwt=require('jsonwebtoken');

const bcrypt=require('bcryptjs');

const dotEnv= require('dotenv');

dotEnv.config();

const secretkey = process.env.MYNAME

const vendorRegister=async(req,res)=>{
    const{email,username,password}=req.body;
    try{
        const vendorEmail=await vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("email already taken");
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newvendor = new vendor({
            username,
            email,
            password:hashedPassword
        });
        await newvendor.save();

        res.status(201).json({message:"vendor register successfully"})
        console.log('registerd')
    }
    catch (error){
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
}

const vendorLogin = async(req,res)=>{
    const { email,password}=req.body;
    try{
        const Vendor = await vendor.findOne({email});
        if(!Vendor || !(await bcrypt.compare(password,Vendor.password))){
             return res.status(401).json({error:"invalid password"})
        }
        const token=jwt.sign({vendorId: Vendor._id},secretkey)
        res.status(200).json({success:"login successfully",token})
        console.log(email,"this is my token",token);


    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"internal server error"})

    }
}


const getAllvendors=async(req,res)=>{
    try {
        const vendors=await vendor.find().populate('firm')
    res.json({vendors})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"}
        )
    }
}

const getVendorById=async(req,res)=>{
    const vendorId=req.params.id;
    try {
        const Vendor=await vendor.findById(vendorId).populate('firm');
        if(!Vendor){
            return res.status(404).json({error:"vendor not found"})
        }
        res.status(200).json({Vendor})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}

module.exports={vendorRegister,vendorLogin,getAllvendors,getVendorById}