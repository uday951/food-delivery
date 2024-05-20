const product= require("../models/product");
const multer =require("multer")
const Firm=require("../models/Ferm")  


const storage= multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,'uplodes/');
    },
    filename:function(req,file,cd){
        cd(null, Date.now()+Path.extname(file.originalname));
    }
})

const upload=multer({storage:storage});

const addproduct=async(req,res)=>{
    try {
        const{productName ,price,category,bestseller,description}=req.body;
        const image=req.file?req.file.filename:undefined;

        const firmId= req.params.firmId;
        const firm=await Firm.findById(firmId)
        if(!firm){
          return res.status(404).json({error:"no firm found"})
        }

        const Product=new product({
            productName,
            price,
            category,
            bestseller,
            description,
            image,
            firm: firm._id
    })

    const savedProduct=await Product.save()

    firm.products.push(savedProduct);
    await firm.save()

    res.status(200).json(savedProduct)
} catch (error) {
    console.log(error);
    res.status(500).json({error:"internal server error"})
}

}

const getproductByFirm = async (req, res) => {
    try { 
        const firmId = req.params.firmId;
        console.log("Firm ID:", firmId); // Log firmId for debugging
        const firm = await Firm.findById(firmId);
        console.log("Firm:", firm); // Log firm object for debugging
        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }
        const products = await product.find({ firm: firm._id }); 
        const restatentName=firm.firmName;
        console.log("Products:", products); 
        res.status(200).json({ restatentName,products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const deletProductById=async(req,res)=>{
    try {
        const productId=req.params.productId;

        const deletproduct=await product.findByIdAndDelete(productId)
    
        if(!productId){
            res.status(404).json({error:"no product found"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};



module.exports = { addproduct: [upload.single('image'), addproduct], getproductByFirm, deletProductById};
