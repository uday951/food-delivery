const mongoose=require("mongoose");

const firmSchema=new mongoose.Schema({
    firmName:{
        type:String,
        required:true,
        unique:true
        
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg','nonveg']
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum:['south-india','north-india','chains','bakary']
            }
        ]
    },
    offer:{
        type:String,
    },
    image:{
        type:String,
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'vendor'
        }
    ],
    product:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'product'
        }
    ],
    products: { type: Array, default: [] }
})

const Firm=mongoose.model('Firm',firmSchema)

module.exports=Firm