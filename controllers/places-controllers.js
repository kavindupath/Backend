const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const getCordinateForAddress = require("../utils/location");
const Place=require('../models/place');



const getPlaces = async (req, res, next) => {
  let places;
  try {
    places=await Place.find();
    res.status(200).json({ places });

  } catch (error) {
    console.log("Could not find places" + error);
    res.status(500).json({ message: "Could not find places" });
    return;
};
};

const getPlaceById = async (req, res, next) => {
  let place;
  const placeId = req.params.pid;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    console.log("Could not find a place" + err);
  }

  if (!place) {
    const error = new HttpError("Could not find a place for a given id", 404);
    throw error; // already cancels the function execution so no need to call 'return'
  }
  //The toObject() method is usually used in Mongoose.
  // this method is used to convert the Mongoose document to a plain JavaScript object.
  /*{ getters: true }: This is an optional parameter passed to the toObject() method. 
  When getters is set to true, it includes any virtual properties defined in the Mongoose schema as part of the resulting object. 
  Virtual properties are properties that are not stored directly in the database but are derived from other properties or computed on the fly. */
  //Here in our case to convert _id to id
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userID = req.params.uID;
  let places;
  try {
     places = await Place.find({creator:userID});

  } catch (err) {
    console.log('There are no places for the UID'+err);
  }

  if (!places || places.length === 0) {
    const error = new HttpError(
      "Could not find a places for a given user id",
      404
    );
    return next(error);
  }
  res.json({ places:places.map(p=>p.toObject({getters:true}))});
};

const createPlace = async (req, res, next) => {
  //validate the request
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    console.log("Error in creating new places");
    return next(
      new HttpError("invalid input passed please check your data", 422)
    ); // for async function use next() instead of throw
  }

  //get the data from the request body
  const { title, creator, description, address } = req.body;

  //get the cordinates from the Google API
  let cordinates;
  try {
    cordinates = await getCordinateForAddress(address);
  } catch (error) {
    return next(error);
  }
  //create a new place object
  const createdPlace = new Place({
    title,
    description,
    creator,
    address,
    location: cordinates,
    image: "string url",
  });

  //save the Place object with the data in the MONGO DB
  try {
    await createdPlace.save();
    console.log("A new Place saved");
  } catch (err) {
    const error = new HttpError("creating place failed", 500);
    return next(error);
  }
  res.status(200).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    console.log("Error in updating places");
    throw new HttpError("invalid input passed please check your data", 422);
  }
  const { title, creator, description } = req.body;
  const placeId = req.params.pid;
  let updatedPlace;
  try {
    updatedPlace = await Place.findById(placeId);
  } catch (error) {
    console.log("Error in updating");
  }

  updatedPlace.title = title;
  updatedPlace.creator = creator;
  updatedPlace.description = description;
  try {
    await updatedPlace.save();
    console.log("The  Place updated");
  } catch (error) {
    console.log("Could not update the place" + error);
  }

  res.status(200).json({ place: updatedPlace.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeid = req.params.pid;
  let place;

  try {
    place = await Place.findById(placeid);
    console.log(place);
    } catch (error) {
    console.log("Somehting went wrong");
  }

  if (!place) {
    // If place is null or undefined, it means the document was not found.
    console.log("Place not found");
    res.status(404).json({ message: "Place not found" });
    return;
  }

  try {
     await place.remove();
    console.log('Place removed');
    res.status(200).json({ message: "Delete the  Place" });

  } catch (error) {
    console.log("Could not delete place" + error);
    res.status(500).json({ message: "Could not delete place" });
    return;
  }
};

exports.getPlaces = getPlaces;
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
