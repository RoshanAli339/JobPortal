import express from "express";
import {applyJob, getAppliedJobs, updateStatus, getApplicants} from "../controllers/applicationController.js";
import isAuthenticated from "../middleware/authnetication.js";
import isApplicant from "../middleware/applicantCheck.js";
import isRecruiter from "../middleware/recruiterCheck.js";

const router = express.Router();

router.post("/apply/:jobId", isAuthenticated, isApplicant, applyJob);
router.get("/getMyJobs", isAuthenticated, isApplicant, getAppliedJobs);
router.get("/:jobId/getApplicants", isAuthenticated, isRecruiter, getApplicants);
router.post("/status/:id/update", isAuthenticated, isRecruiter, updateStatus);

export default router;