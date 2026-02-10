import jwt from 'jsonwebtoken';
import {JWT_KEY, JWT_EXPIRE_TIME} from "../config/config.js" ;

export const TokenEncode=async (email,user_id,role)=>{
        const KEY=JWT_KEY
        const EXPIRE={expiresIn:JWT_EXPIRE_TIME}
        const PAYLOAD={email:email,user_id:user_id,role:role}
        return jwt.sign(PAYLOAD,KEY,EXPIRE)

    }

export const TokenDecode=(token)=>{
    try{
        return jwt.verify(token,JWT_KEY )

    }
    catch (e){
        return null
    }
}
