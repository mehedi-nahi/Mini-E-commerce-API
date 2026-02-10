import {BrandListService} from "../service/ProductService.js";

export const BrandList=async(req,res)=>{
    let result=await BrandListService();
    return res.json(result);
}