const Firm=require("../models/Ferm");

const vendor=require("../models/vendor");

const multer=require("multer");

const path=require('path')

const storage= multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,'uplodes/');
    },
    filename:function(req,file,cd){
        cd(null,Date.now()+Path.extname(file.orginalname));
    }
})

const upload=multer({storage:storage});

const addFirm= async(req,res)=>{

    try {
        const {firmName, area, category,region,offer}=req.body;

        const image = req.file?req.file.filename:undefined;
    
        const Vendor= await vendor.findById(req.vendorId);
        if(!Vendor){
            res.status(404).json({message:"Vendor not found"})
        }
        const firm = new Firm({
            firmName,area,category,region,offer,image,vendor:Vendor._id
        })

        const savedFirm=await firm.save();

        Vendor.firm.push(savedFirm)

        await Vendor.save()

        return res.status(200).json({message:"firm added success"})
    } catch (error) {
        console.log(error)
        res.status(500).json("internal server error")
    }
}


const deletFirmById=async(req,res)=>{
    try {
        const firmId=req.params.firmId;

        const deletfirm=await Firm.findByIdAndDelete(firmId)
    
        if(!productId){
            res.status(404).json({error:"no product found"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports={addFirm:[upload.single('image'),addFirm],deletFirmById}; 