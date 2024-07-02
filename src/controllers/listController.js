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