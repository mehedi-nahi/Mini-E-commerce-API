import {TokenDecode} from "../utility/tokenUtility.js";

const AuthMiddleware = (req, res, next) => {
    try {
        const token = req.headers['token'] || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ status: "fail", message: "Token required" });
        }
        const decoded = TokenDecode(token);
        console.log("Decoded token:", decoded);
        if (!decoded) {
            return res.status(401).json({ status: "fail", message: "Invalid token" });
        }
        req.user = {
            user_id: decoded.user_id,
            email: decoded.email,
            role: decoded.role
        };
        next();
    } catch (error) {
        return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
};
export default AuthMiddleware;
