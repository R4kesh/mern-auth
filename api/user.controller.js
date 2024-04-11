import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';



export const test=(req,res)=>{
    res.json({
        message:'Api is working!'
    })
}

export const updateUser = async (req, res, next) => {

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
}

    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
      
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
       
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            
          },
        },
        { new: true }
      );
      
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };


  export const getUser=async(req,res,next)=>{
    try {
      const users = await User.find();
      console.log('usr',users);
        res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user details', error: error.message });
    }
  }

  export const deleteUser=async(req,res,next)=>{
    try {
      const { id } = req.params;
      
      const deletedUser = await User.findByIdAndDelete(id);
      
        if (!deletedUser) {
          
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
      
    }
  }

  export const updateUsers = async (req, res, next) => {
    try {
        const { id } = req.params; 
        const { username, email } = req.body; 
        
        
        if (!username || !email) {
            return res.status(400).json({ success: false, message: 'Both username and email are required for update' });
        }

        
        const user = await User.findById(id);

        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        
        user.username = username;
        user.email = email;

        
        await user.save();

        
        res.status(200).json({ success: true, message: 'User details updated successfully', user });
    } catch (error) {
        
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
