import Listing from "../model/listing.js"


export const createList = async (req, res, next) => {
    try {
      const listing = new Listing(req.body);
      await listing.save();
      return res.status(201).json(listing);
    } catch (error) {
      next(error);
    }
  };

  export const getAllListings = async (req, res,next) => {
    try {
      const listings = await Listing.find({});
      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };
  
  export const getListById = async (req, res, next) => {
    try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) {
        return res.status(404).send('List not found!');
      }
      res.status(201).json(listing);
    } catch (error) {
      next(error);
    }
}

export const updateList = async(req,res,next)=>{
  
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).send('List cannot be empty!');
    }
    try{
    const updateList = await Listing.findByIdAndUpdate(
      req.params.id,req.body,{useFindAndModify: false}
    )
    res.status(201,"Updated Successfully!!").json(updateList)
  }
  catch(error){
    next(error)
  }
}

export const deleteList=async(req,res,next)=>{
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return res.status(404).send('Property Not Found!');
  }
try{
    await Listing.findByIdAndDelete(req.params.id);
    {
      res.status(201).json("Listing has been deleted!")
    }
}
catch(error){
  next(error);
}
}