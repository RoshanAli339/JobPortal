const isRecruiter = (req, res, next) => {
    if (req.role !== 'recruiter'){
        return res.status(403).json({
            message: "Forbidden: Only recruiters are allowed to access this resource!"
        });
    }
    next();
}

export default isRecruiter