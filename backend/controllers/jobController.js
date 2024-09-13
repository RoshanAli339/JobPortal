import error404 from "../utils/400.js";
import Job from "../models/jobModel.js";

export const postJob = async (req, res) => {
    try {
        const requiredFields = ['title', 'description', 'requirements', 'salary', 'experienceLevel',
            'location', 'jobType', 'positions', 'company']
        const userId = req._id;

        const missingFields = requiredFields.filter(field => !req.body[field])

        if (missingFields.length > 0) {
            return error404(res, "Missing required fields: " + missingFields)
        }

        req.body['requirements'] = req.body['requirements'].split(',')
        // req.body['salary'] = Number(req.body['salary'])
        const job = await Job.create({
            ...req.body,
            created_by: userId
        })

        return res.status(200).json({
            message: "New job created successfully",
            jobPostingSuccess: true,
            job
        })
    } catch (error) {
        console.log(error);
        return error404(res, "Something went wrong")
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query['keyword'] || ''
        const query = {
            $or: [
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}}
            ]
        }

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({createdAt: -1}).lean()
        if (!jobs) {
            return error404(res, "No jobs found")
        }

        jobs.forEach((job) => {
            delete job.applications
        })

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        return error404(res, "Something went wrong!")
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.jobId
        const job = await Job.findById(jobId).populate({
            path: "company"
        }).lean()
        if (!job) {
            return error404(res, "Job not found!")
        }

        if (req.role === 'applicant') {
            delete job.applications
        }

        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
        return error404(res, "Something went wrong!")
    }
}

export const getJobsCreated = async (req, res) => {
    try {
        const adminId = req._id;
        const jobs = await Job.find({created_by: adminId}).lean()

        if (!jobs) {
            return error404(res, "No jobs created!")
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error)
        return error404(res, "Something went wrong!")
    }
}