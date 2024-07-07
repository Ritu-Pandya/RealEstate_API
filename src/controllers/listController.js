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
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    res.status(400).json(error);
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