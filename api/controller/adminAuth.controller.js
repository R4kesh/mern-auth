import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const adminLogin = async (req, res, next) => {
   
    const adEmail='admin@gmail.com'
    const adpassword='admin123'
    const { email, password } = req.body;
    try {
        if (email === adEmail && password === adpassword) {
            const token = jwt.sign({ email: adEmail }, process.env.ADMIN_JWT_SECRET);
            const expiryDate = new Date(Date.now() + 3600000);
            
            res
                .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
                .status(200)
                .json({ message: 'Admin login successful' });
        } else {
            return next(errorHandler(401, 'Invalid admin credentials'));
        }

        
    } catch (error) {
        next(error);
    }
}

export const logout=async(req,res)=>{
    res.clearCookie('access_token').status(200).json('Signout success!');
}
