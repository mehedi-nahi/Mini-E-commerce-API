import {
    CategoryListService,
    ListByBrandService,
    ListByCategoryService,
    SliderListService,
    ListByRemarkService,
    DetailsService,
    ListByKeywordService,
    ReviewListService,
    CreateProductService,
    UpdateProductService,
    DeleteProductService,
    UpdateStockService
} from "../service/ProductService.js";



export const ProductListByCategory=async(req,res)=>{
    let result=await ListByCategoryService(req);
    return res.json(result);
}

export const ProductListBySlider=async(req,res)=>{
    let result=await SliderListService();
    return res.json(result);
}

export const ProductListByRemark=async(req,res)=>{
    let result=await ListByRemarkService(req);
    return res.json(result);
}


export const ProductListByBrand=async(req,res)=>{
    let result=await ListByBrandService(req);
    return res.json(result);
}

export const ProductDetailsID=async(req,res)=>{
    let result=await DetailsService(req);
    return res.json(result);
}

export const ProductListByKeyword =async(req,res)=>{
    let result=await ListByKeywordService(req);
    return res.json(result);
}

export const ProductReviewListByID=async(req,res)=>{
    let result=await ReviewListService(req);
    return res.json(result);
}

export const CreateProduct = async(req,res)=>{
    let result=await CreateProductService(req);
    return res.json(result);
}
export const UpdateProduct = async(req,res)=>{
    let result=await UpdateProductService(req);
    return res.json(result);
}
export const DeleteProduct = async(req,res)=>{
    let result=await DeleteProductService(req);
    return res.json(result);
}
export const UpdateStock = async(req,res)=>{
    let result=await UpdateStockService(req);
    return res.json(result);
}