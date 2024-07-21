import User from "../model/user.js";

export const getAllUser=async(req,res,next)=>{
    try{
 const UserData = await User.findById(req.params.id);
 if(!UserData){
    return res.status(404).send('User not found!');
 }
 const { password: pass, ...rest } = UserData._doc;

 res.status(201).json(rest);

    }catch(error){
        next(error);
    }
}

export const getAllUserData=async(req,res,next)=>{
    try {
        const userInfo = await User.find({});
        return res.status(200).json(userInfo);
      } catch (error) {
        next(error);
      }
}

export const updateUser=async(req,res)=>{
  if (req.user.id !== req.params.id)
    return res.status(200).json("you can not update profile of other user");
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
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error)
  }
}

export const deleteUser=async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User Not Found!');
    }
  try{
      await User.findByIdAndDelete(req.params.id);
      {
        res.status(201).json("User has been deleted!")
      }
  }
  catch(error){
    next(error);
  }
  }