import {CategoryListService} from "../service/ProductService.js";

export const CategoryList=async(req,res)=>{
    try{
        return res.json({status:"success"})
    }
    catch(e){
        return res.json({status:"error","Message": e.toString()});
    }
}