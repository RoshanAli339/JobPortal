import express from 'express';
import {postJob, getAllJobs, getJobsCreated, getJobById} from "../controllers/jobController.js";
import isAuthenticated from "../middleware/authnetication.js";
import isRecruiter from "../middleware/recruiterCheck.js";

const router = express.Router();

router.post("/post", isAuthenticated, isRecruiter, postJob);
router.get("/allJobs", isAuthenticated, getAllJobs);
router.get("/:jobId", isAuthenticated, getJobById);
router.post("/createdJobs", isAuthenticated, isRecruiter, getJobsCreated);

export default router