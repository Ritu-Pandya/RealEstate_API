import bcrypt from 'bcryptjs'
import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { sendActivationEmail, sendResetPasswordEmail } from '../utils/sendEmailActivation.js';


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const activationToken = uuidv4();
    const newUser = new User({ username, email, password: hashedPassword, activationToken });
    try {
      await newUser.save();
      await sendActivationEmail(email,activationToken);
      res.status(201).json('User created successfully!Please check your email to activate your account.');
    } catch (error) {
      next(error);
    }
  };

 
  export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email:email });
      if (!validUser.isActive) return res.status(403).send("Account not activated,Please activate the link");

      if (!validUser) return res.status(404).send("User not found");
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (!validPassword) return res.send("Wrong Credentials!!");
      const token = jwt.sign({ id: validUser._id }, "WEFWQWE",{ expiresIn: '1h' });
      
      res.status(201).json({
        token,
          _id: validUser._id,
          userName: validUser.username,
          email: validUser.email
        
      });
    } catch (error) {
      
    }
  };

  export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).send("User not found");
  
      const resetToken = uuidv4();
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 1800000; 
  
      await user.save();
  
      const frontendUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
      await sendResetPasswordEmail(user.email, frontendUrl);
  
      res.status(200).send("Password reset link sent to your email address");
    } catch (error) {
      next(error);
    }
  };

  export const resetPassword = async (req, res, next) => {
    const { token } = req.body;
    const { password } = req.body;
  
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) return res.status(400).send("Invalid or expired token");
  
      // Hash the new password
      user.password = await bcrypt.hash(password, 12);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
  
      res.status(200).send("Password has been reset successfully");
    } catch (error) {
      next(error);
    }
  };