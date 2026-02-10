import {CreateUserProfile,UpdateUserProfile,ReadUserProfile} from "../controllers/UserController.js";
import UserModel from "../model/usersModel.js";
import {TokenEncode} from "../utility/tokenUtility.js";
import ProfileModel from "../model/profilesModel.js";

export const LoginService = async (req) => {
    try{
        let {email}=req.body;
        let code=Math.floor(100000 + Math.random() * 900000);
        let EmailText=`Your login code is ${code}. It is valid for 10 minutes.`;
        let EmailSubject='Email Verification Code';

        //await SendEmail(email,EmailText,EmailSubject);
        await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true});

        return {status:true,message:"Verification code sent to your email."};
    }
    catch (e) {
        return { status: false, message: e.message }
    }
}


export const VerifyLoginService = async (req) => {
    try{
        let {email,otp}=req.body;

        let total = await UserModel.find({email:email,otp:otp})
        if(total.length===1) {
            let user_id = await UserModel.find({email: email, otp: otp}).select('_id')
            let user = await UserModel.findOne({email: email, otp: otp});
            if (user) {
                let token = await TokenEncode(email, user_id[0]['_id'].toString(), user.role)
                await UserModel.updateOne({email: email}, {$set: {otp: 0}});
                return {status: "success", message: "Valid OTP.", token: token};
            }
        }
        return { status: "fail", message: "Invalid OTP." };
    }
    catch (e) {
        return { status: false, message: e.message }
    }
}

export const CreateUserProfileService = async (req) => {
    try{
        let user_id=req.headers['user_id'];
        let reqBody=req.body;
        reqBody.userID=user_id;
        await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true});
        return {status:true,message:"Profile created successfully."};
    }
    catch (e) {
        return { status: false, message: e.message }
    }
}

export const UpdateUserProfileService = async (req) => {
    try{
        let user_id=req.headers['user_id'];
        let reqBody=req.body;
        reqBody.userID=user_id;
        await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true});
        return {status:true,message:"Profile Updated successfully."};
    }
    catch (e) {
        return { status: false, message: e.message }
    }
}


export const ReadUserProfileService = async (req) => {
    try{
        let user_id=req.headers['user_id'];
        let data=await ProfileModel.findOne({userID:user_id});
        return {status:true,message:"Profile data fetched successfully.",data:data};
    }
    catch (e) {
        return { status: false, message: e.message }
    }
}