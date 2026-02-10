import WishModel from "../model/wishesModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const CreateWishService = async (req) => {
    try{
        let user_id=req.headers['user_id'];
        let {productID}=req.body;
        let postJson= {
            productID: productID,
            userID: user_id
        }
        await WishModel.updateOne(postJson,{$set:postJson},{upsert:true});
        return {status:"success" ,message:"Product added to wishlist successfully."};

    }
    catch (e) {
        return { status: false, message: e.message }
    }
}


export const ReadWishListService = async (req) => {
    try {
        let user_id = new ObjectId(req.headers['user_id']);

        let matchStage= {
            $match: { userID: user_id }
        }

        let JoinStageProduct = {
            $lookup: {
                from: "products", localField: "productID", foreignField: "_id", as: "product"
            }
        }

        let data= await WishModel.aggregate([
            matchStage,
            JoinStageProduct
        ])
        return { status: "success", data: data };
    }

    catch (e) {
        return { status: false, message: e.message }
    }
}



export const RemoveWishService = async (req) => {
    try{
        let user_id=req.headers['user_id'];
        let {productID}=req.body;
        let postJson= {
            productID: productID,
            userID: user_id
        }
        await WishModel.deleteOne(postJson);
        return {status:"success" ,message:"Product removed from wishlist successfully."};

    }
    catch (e) {
        return { status: false, message: e.message }
    }




}

