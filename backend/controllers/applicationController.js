import error404 from "../utils/400.js";
import {Application} from "../models/applicationModel.js";
import Job from "../models/jobModel.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req._id
        const jobId = req.params.jobId;

        if (!jobId) {
            return error404(res, "Job ID is required")
        }

        const existingApplication = await Application.findOne({job: jobId, applicant: userId})

        if (existingApplication) {
            return error404(res, "Application already exists!")
        }

        const job = await Job.findById(jobId)
        if (!job) {
            return error404(res, "Job with the give id does not exist!")
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
            status: 'pending'
        })

        job.applications.push(newApplication._id)

        await job.save()

        return res.status(201).json({
            message: "Job applied successfully.",
            applicationSuccess: true
        })
    } catch (error) {
        console.log(error)
        return error404(res, "Something went wrong!")
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req._id;
        const applications = await Application.find({
            applicant: userId
        }).sort({createdAt: -1}).populate({
            path: "job",
            options: {
                sort: {createdAt: -1},
                populate: {
                    path: "company",
                    options: {sort: {createdAt: -1}}
                }
            }
        }).lean()

        if (!applications) {
            return res.status(404).json({
                message: "No applications found"
            })
        }

        return res.status(200).json({
            applications
        })
    } catch (error) {
        console.log(error)
        return error404(res, "Something went wrong!")
    }
}

export const getApplicants = async (req, res) => {
    try{
        const jobId = req.params.jobId;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: {sort:{createdAt:-1}},
            populate: {
                path: "applicant",
                select: "-password -role -createdAt -updatedAt"
            }
        })

        if (!job){
            return error404(res, "Job with the given id does not exist")
        }

        if (job.created_by.toString() !== req._id.toString()){
            return res.status(403).json({
                message: "Forbidden: You are not authorized to perform this action!"
            })
        }

        return res.status(200).json({
            applications: job.applications,
            success: true
        })
    }
    catch(error){
        console.log(error)
        return error404(res, "Something went wrong!")
    }
}

export const updateStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return error404(res, "Status is required")
        }

        const application = await Application.findById(applicationId)
        if (!application) {
            return error404(res, "Application not found!")
        }

        // To make sure that the same recruiter who has posted the job
        // is only able to update the status of an application
        const job = await Job.findById(application.job);
        if (job.created_by.toString() !== req._id.toString()) {
            console.log(job.created_by)
            console.log(req._id)
            return res.status(403).json({
                message: "Forbidden: You are not authorized to perform this action!"
            })
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
        })
    } catch (error) {
        console.log(error)
        return error404(res, "Something went wrong!")
    }
}