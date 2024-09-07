import express from "express";
import {getCompany, getCompanyById, registerCompany, updateCompany} from "../controllers/companyController.js";
import isAuthenticated from "../middleware/authnetication.js";

const router = express.Router();

router.post("/register", isAuthenticated,registerCompany)
router.get("/getCompany", isAuthenticated, getCompany)
router.get("/getCompany/:id", isAuthenticated,getCompanyById)
router.put("/updateCompany/:id", isAuthenticated,updateCompany)

export default router