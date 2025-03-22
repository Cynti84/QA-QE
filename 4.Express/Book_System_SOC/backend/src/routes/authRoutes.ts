import express from 'express'
import { loginUser, logoutUser, registerUser } from '../controllers/authController'
const router = express.Router()
//public routes
router.post("/register", registerUser) //register user
router.post("/login", loginUser) // login user
router.post("/logout", logoutUser) // logout user
export default router