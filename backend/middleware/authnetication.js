import jwt from 'jsonwebtoken';
import {User} from "../models/userModel.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode){
            return res.status(401).json({
                message: 'Invalid token',
            });
        }

        const user = await User.findById(decode.userId)
        if (!user){
            return res.status(401).json({
                message: 'Unauthorized',
            })
        }

        req._id = user._id;
        req.role = user.role;
        next();
    }
    catch (error) {
        console.log(error)

        return res.status(401).json({
            message: 'Unauthorized',
        })
    }
}

export default isAuthenticated;