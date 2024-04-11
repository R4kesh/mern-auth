import express from 'express';
import { test,updateUser,getUser,deleteUser,updateUsers } from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
// import multer from 'multer';


// const storage = multer.diskStorage({
//  destination: (req, file, cb) => {
//     cb(null, 'public/images');
//  },
//  filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//  },
// });

// const upload = multer({ storage });

const router = express.Router();
router.get('/',test)
router.post('/update/:id',verifyToken,updateUser);
router.get('/details',getUser)
router.delete('/delete/:id',deleteUser)
router.put('/update/:id',updateUsers)
export default router