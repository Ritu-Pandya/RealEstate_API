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
      console.log('chk22',validUser);
      if (!validUser) return res.send("user not found");
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (!validPassword) return res.send("wrong password");
      const token = jwt.sign({ id: validUser._id }, "WEFWQWE");
      
      res.send(token);
    } catch (error) {
      
    }
  };