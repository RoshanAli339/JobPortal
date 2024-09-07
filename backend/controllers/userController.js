import {User} from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import Jwt from "jsonwebtoken";
import error404 from "../utils/400.js";

// Registration business logic
export const register = async (req, res) => {
    try {
        const {fullName, email, phoneNumber, password, role} = req.body;

        // if any of the required fields is missing
        if (!fullName || !email || !phoneNumber || !password) {
            return error404(res, "Something is missing")
        }

        // checking if a user already exists using this email address
        const user = await User.findOne({email});
        if (user) {
            return error404(res, "User already exists with this email!")
        }

        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // creating user
        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        })

        return res.status(201).json({
            message: "User successfully created!",
            registrationSuccess: true,
        })
    } catch (error) {
        console.log(error)
        return error404(res, "Something went wrong!")
    }
}

// Login business logic
export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        if (!email || !password || !role) {
            return error404(res, "Something is missing")
        }

        const user = await User.findOne({email});

        if (!user) {
            return error404(res, "User doesnot exist with this email!")
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return error404(res, "Incorrect username or password!")
        }

        if (role !== user.role) {
            return error404(res, "Incorrect role!")
        }

        const tokenData = {
            userId: user._id,
        }

        const jwt = await Jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '12h'});

        return res.status(200).cookie("token", jwt, {
            maxAge: 12 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict'
        }).json({
            message: `Welcome back, ${user.fullName}`,
            userId: user._id,
            loginSuccess: true,
        })
    } catch (error) {
        console.log(error)
        return error404(res, "Something went wrong!")
    }
}

// Logout business logic
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "Logged out",
            logoutSuccess: true,
        })
    } catch (error) {
        console.log(error);
        return error404(res, "Something went wrong!")
    }
}

// Update profile business logic
export const updateProfile = async (req, res) => {
    try {
        const userId = req._id;
        // changes can be made to required fields only
        const updateData = Object.keys(req.body).reduce((acc, key) => {
            acc[key] = req.body[key]
            if (key === "profile" && acc[key]['skills'] !== undefined && acc[key]['skills'] !== null) {
                acc[key]['skills'] = acc[key]['skills'].split(",")
            }
            return acc
        }, {})

        const user = await User.findByIdAndUpdate(userId, updateData, {new: true})

        if (!user) {
            return error404(res, "User not found!")
        }

        // TO-DO: implement resume upload using cloudinary

        return res.status(200).json({
            message: "User successfully updated",
            userId: user._id,
            updateSuccess: true,
        })

    } catch (e) {
        console.log(e)
        return error404(res, "Something went wrong!")
    }
}