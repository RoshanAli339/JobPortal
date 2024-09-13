const isApplicant = async function(req, res, next) {
    if (req.role !== "applicant"){
        return res.status(403).json({
            message: "Forbidden: Only applicants are allowed to access this resource"
        })
    }
    next()
}

export default isApplicant