import express from 'express'
import { signup,signin,signout } from '../controller/auth.controller.js';
import { adminLogin,logout } from '../controller/adminAuth.controller.js';
const router=express.Router();

router.post("/signup",signup)
router.post("/signin",signin)
router.get('/signout', signout);
router.post('/adlogin',adminLogin)
router.get('/logout',logout);
export default router;