import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    title:{type:String,required:true},
    shortDesc:{type:String,required:true},
    price:{type:Number,required:true},
    discount:{type:Number,default:0},
    discountPrice:{type:Number,required:true},
    image:{type:String,required:true},
    start:{type:String,required:true},
    stock:{type:Boolean,required:true},
    remark:{type:String,required:true},
    categoryId:{type:mongoose.Schema.Types.ObjectId,ref:'categories',required:true},
    brandID:{type:mongoose.Schema.Types.ObjectId,ref:'brands',required:true}
    }
    ,
    {
        timestamps: true,
        versionKey:false
    }
)
const ProductModel = mongoose.model('products', DataSchema);

export default ProductModel;