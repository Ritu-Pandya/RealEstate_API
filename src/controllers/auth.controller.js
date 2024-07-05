import bcrypt from 'bcryptjs'
import User from '../model/user.js';
import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json('User created successfully!');
    } catch (error) {
      next(error);
    }
  };

  export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email:email });
      if (!validUser) return res.status(404).send("User not found");
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (!validPassword) return res.send("Wrong Credentials!!");
      const token = jwt.sign({ id: validUser._id }, "WEFWQWE");
      
      res.status(201).json({
        token,
       
          _id: validUser._id,
          userName: validUser.username,
          email: validUser.email
        
      });
    } catch (error) {
      
    }
  };