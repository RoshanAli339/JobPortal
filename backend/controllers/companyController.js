import {Company} from "../models/companyModel.js";
import error404 from "../utils/400.js";

export const registerCompany = async (req, res) => {
    try {
        const {companyName} = req.body;

        if (!companyName) {
            return error404(res, "Company name is required")
        }

        let company = await Company.findOne({name: companyName}).lean()

        if (company) {
            return error404(res, "Company already exists with this name")
        }

        company = await Company.create({
            name: companyName,
            userId: req._id
        })

        return res.status(201).json({
            message: `${companyName} registered successfully.`,
            company,
            registerSuccess: true
        })
    } catch (error) {
        console.log(error)
        return error404(res, "Something went wrong!")
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req._id; // logged in user id
        const companies = await Company.find({userId}).lean()
        if (!companies) {
            return error404(res, "Companies not found!")
        }

        return res.status(200).json({
            companies,
            success: true
        })

    } catch (error) {
        console.log(error)
        return error404(res, "Something went wrong!")
    }
}


export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId).lean()

        if (!company) {
            return error404(res, "Company not found!")
        }

        return res.status(200).json({
            company,
            success: true,
        })
    } catch (error) {
        console.log(error)
        return error404(res, "Something went wrong!")
    }
}

export const updateCompany = async (req, res) => {
    try {
        const file = req.file;
        // TO DO: Implement cloudinary

        const updateData = Object.keys(req.body).reduce((acc, key) => {
            if (req.body[key] !== undefined && req.body[key] !== null) {
                acc[key] = req.body[key]
            }
            return acc
        }, {})

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new: true})

        if (!company) {
            return error404(res, "Company not found!")
        }

        return res.status(200).json({
            message: "Company information updated successfully!",
            updateSuccess: true
        })
    } catch (e) {
        console.log(e)
        return error404(res, "Something went wrong")
    }
}