import BrandModel from "../model/brandsModel.js";
import CategoryModel from "../model/categoriesModel.js";
import ProductModel from "../model/productsModel.js";
import SliderModel from "../model/slidersModel.js";
import ReviewModel from "../model/reviewsModel.js";
import {ProductListByBrand} from "../controllers/ProductController.js";
import mongoose from "mongoose";
const ObjectId=mongoose.Types.ObjectId;



export const BrandListService=async()=>{
    try{
        let data=await BrandModel.find();
        return {status:true,data:data};
    }
    catch (e) {
        return {status:false,data:e.toString()};
    }
}


export const CategoryListService=async()=> {
    try {
        let data = await CategoryModel.find();
        return {status: "success", data: data};
    } catch (e) {
        return {status: "error", data: e.toString()};
    }
}


export const SliderListService=async()=>{
    try {
        let data = await SliderModel.find();
        return {status: "success", data: data};
    } catch (e) {
        return {status: "error", data: e.toString()};
    }
}


export const ListByBrandService=async(req)=>{
    try{
        let BrandId=new ObjectId(req.params.BrandID);
        let MatchStage={$match:{brandID:BrandId}};

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage= {$lookup:{from:"categories",localField:"categoryId",foreignField:"_id",as:"category"}};

        let UnwindBrandStage={$unwind:"$brand"};
        let UnwindCategoryStage={$unwind:"$category"};

        let ProjectionStage={$project:{
                'brand_id':0,
                'category_id':0,
                'categoryID':0,
                'brandID':0}
        }

        let data= await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ]);

        return {status:"success",data:data};
    }
    catch(e){
        return {status:"error",data:e.toString()};
    }

}





export const ListByCategoryService=async(req)=>{
    try{
        let CategoryID=new ObjectId(req.params.CategoryID);
        let MatchStage={$match:{categoryId:CategoryID}};

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage= {$lookup:{from:"categories",localField:"categoryId",foreignField:"_id",as:"category"}};

        let UnwindBrandStage={$unwind:"$brand"};
        let UnwindCategoryStage={$unwind:"$category"};

        let ProjectionStage={$project:{
                'brand_id':0,
                'category_id':0,
                'categoryID':0,
                'brandID':0}
        }

        let data= await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ]);

        return {status:"success",data:data};
    }
    catch(e){
        return {status:"error",data:e.toString()};
    }

}




export const ListByRemarkService=async(req)=>{
    try{
        let Remark=req.params.Remark;
        let MatchStage={$match:{remark:Remark}};

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage= {$lookup:{from:"categories",localField:"categoryId",foreignField:"_id",as:"category"}};

        let UnwindBrandStage={$unwind:"$brand"};
        let UnwindCategoryStage={$unwind:"$category"};

        let ProjectionStage={$project:{
                'brand_id':0,
                'category_id':0,
                'categoryID':0,
                'brandID':0}
        }

        let data= await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ]);

        return {status:"success",data:data};
    }
    catch(e){
        return {status:"error",data:e.toString()};
    }

}

export const ListByKeywordService=async(req)=>{
    try{
        let keyword=req.params.keyword;
        let regex={"$regex":keyword,"$options":"i"};
        let SearchParams=[{title:regex},{shortDes:regex}];
        let SearchQuery={"$or":SearchParams};
        let MatchStage={$match:SearchQuery};


        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage= {$lookup:{from:"categories",localField:"categoryId",foreignField:"_id",as:"category"}};
        let UnwindBrandStage={$unwind:"$brand"};
        let UnwindCategoryStage={$unwind:"$category"};

        let ProjectionStage= {
            $project: {
                'brand_id': 0,
                'category_id': 0,
                'categoryID': 0,
                'brandID': 0
            }
        };

        let data=await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ]);
        return {status:"success",data:data};
    }
    catch (e) {
        return {status:"error",data:e.toString()};
    }

}


export const DetailsService=async(req)=>{
    try{
        let ProductID=new ObjectId(req.params.ProductID);
        let MatchStage={$match:{_id:ProductID}};

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage= {$lookup:{from:"categories",localField:"categoryId",foreignField:"_id",as:"category"}};
        let JoinWithDetailsStage= {$lookup:{from:"productdetails",localField:"_id",foreignField:"productId",as:"details"}};


        let UnwindBrandStage={$unwind:"$brand"};
        let UnwindCategoryStage={$unwind:"$category"};
        let UnwindDetailsStage={$unwind:"$details"};

        let ProjectionStage={$project:{
                'brand_id':0,
                'category_id':0,
                'categoryID':0,
                'brandID':0}
        }

        let data= await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            JoinWithDetailsStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            UnwindDetailsStage,
            ProjectionStage,

        ]);

        return {status:"success",data:data};
    }
    catch(e){
        return {status:"error",data:e.toString()};
    }
}


export const ReviewListService=async(req)=>{
    try{
        let ProductID=new ObjectId(req.params.ProductID);
        let MatchStage={$match:{productId:ProductID}};


        let JoinWithProfileStage= {$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"profile"}};
        let UnwindProfileStage={$unwind:"$profile"};

        let ProjectionStage= {
            $project: {
                'des':1,
                'rating':1,
                'profile.cus_name':1,
            }
        };

        let data=await ReviewModel.aggregate([
            MatchStage,
            JoinWithProfileStage,
            UnwindProfileStage,
            ProjectionStage
        ]);

        return {status:"success",data:data};
    }
    catch (e) {
        return {status:"error",data:e.toString()};
    }
}

export const CreateProductService = async (req) => {
    try {
        let reqBody = req.body;
        let data = await ProductModel.create(reqBody);
        return { status: true, message: "Product created successfully.", data: data };
    }
    catch (e) {
        return { status: false, message: e.toString() };
    }
}

export const UpdateProductService = async (req) => {
    try {
        let ProductID = req.params.ProductID;
        let reqBody = req.body;
        let data = await ProductModel.updateOne(
            { _id: ProductID },
            { $set: reqBody }
        );
        return { status: true, message: "Product updated successfully.", data: data };
    }
    catch (e) {
        return { status: false, message: e.toString() };
    }
}

export const DeleteProductService = async (req) => {
    try {
        let ProductID = req.params.ProductID;
        let data = await ProductModel.deleteOne({ _id: ProductID });
        return { status: true, message: "Product deleted successfully.", data: data };
    }
    catch (e) {
        return { status: false, message: e.toString() };
    }
}

export const UpdateStockService = async (req) => {
    try {
        let ProductID = req.params.ProductID;
        let { stock } = req.body;
        let data = await ProductModel.updateOne(
            { _id: ProductID },
            { $set: { stock: stock } }
        );
        return { status: true, message: "Stock updated successfully.", data: data };
    }
    catch (e) {
        return { status: false, message: e.toString() };
    }
}


