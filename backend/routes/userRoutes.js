import express from 'express'
import {
    register,
    login,
    logout,
    updateProfile,
} from '../controllers/userController.js'
import isAuthenticated from '../middleware/authnetication.js'
import { singleUpload } from '../middleware/multer.js'

const router = express.Router()

router.route('/register').post(singleUpload, register)

router.post('/login', login)

router.route('/logout').get(logout)

router.route('/update').put(isAuthenticated, updateProfile)

export default router
