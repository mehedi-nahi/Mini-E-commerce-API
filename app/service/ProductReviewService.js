import ReviewModel from "../model/reviewsModel.js";


export const CreateReviewService = async (req) => {
    try{
        let user_id=req.headers['user_id'];
        let {productID,des,rating}=req.body;
        let postJson= {
            productId: productID,
            des: des,
            rating: rating,
            userID: user_id
        }
        await ReviewModel.updateOne(postJson,{$set:postJson},{upsert:true});
        return {status:"success" ,message:"Review Created successfully."};
    }
    catch (e) {
        return { status: false, message: e.message }
    }
}

