import express from 'express';
import {register, login, logout, updateProfile} from "../controllers/userController.js";
import isAuthenticated from "../middleware/authnetication.js";

const router = express.Router();

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/logout').get(logout);

router.route('/update').put(isAuthenticated,updateProfile);

export default router;