import CartModel from "../model/cartsModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const CreateCartService = async (req) => {
    try{
        let user_id=req.headers['user_id'];
        let {productID,color,qty,size}=req.body;
        let postJson= {
            productID: productID,
            userID: user_id,
            color:color,
            qty:qty,
            size:size
        }
        await CartModel.create(postJson);
        return {status:"success" ,message:"Product added to CartList successfully."};

    }
    catch (e) {
        return { status: false, message: e.message }
    }
}

export const UpdateCartService = async (req) => {
    try{
        let user_id=req.headers['user_id'];
        let {color,qty,size,id}=req.body;

        let postJson= {
            color:color,
            qty:qty,
            size:size
        }

        let data= await CartModel.updateOne({userID:user_id,_id:id},{$set:postJson});
        return {status:"success" ,message:"Product updated to CartList successfully.",data:data};

    }
    catch (e) {
        return { status: false, data:e.toString()}
    }
}



export const RemoveCartService = async (req) => {
    try{
        let user_id=req.headers['user_id'];
        let {id}=req.body;
        let postJson= {
            _id : id,
            userID: user_id
        }
        let data= await CartModel.deleteOne(postJson);
        return {status:"success" ,message:"Product removed from cartList successfully.",data:data};
    }
    catch (e) {
        return { status: false, message: e.message }
    }
}


export const ReadCartListService = async (req) => {
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

        let data= await CartModel.aggregate([
            matchStage,
            JoinStageProduct
        ])
        return { status: "success", message:"Read Successfully", data: data };
    }

    catch (e) {
        return { status: false, message: e.message }
    }
}





