const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const getCordinateForAddress = require("../utils/location");
const Place=require('../models/place');

let DUMMY_PLACES = [
  {
    ID: "P1",
    Name: "Sigiriya",
    Creator: "u1",
    description: "This is a world heritance in Sri Lanka",
    address: "Dambulla, Sigiriya",
    location: {
      lat: 49.4545,
      lng: -45.544,
    },
  },
  {
    ID: "P2",
    Name: "Galle Beach",
    Creator: "u2",
    description: "This is one of the popular beach in Sri Lanka",
    address: "Galle road, galle",
    location: {
      lat: 59.4545,
      lng: -65.544,
    },
  },
];

const getPlaces = (req, res, next) => {
  console.log("places");
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

const updatePlace = (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    console.log("Error in updating places");
    throw new HttpError("invalid input passed please check your data", 422);
  }
  const { name, creator, description, address, location } = req.body;
  const placeId = req.params.pid;

  const updatedPLace = { ...DUMMY_PLACES.find((p) => p.ID === placeId) }; // use the spread operator
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.ID === placeId);

  updatedPLace.Name = name;
  updatedPLace.Creator = creator;
  updatedPLace.description = description;
  (updatePLace.location = location), (updatedPLace.address = address);

  DUMMY_PLACES[placeIndex] = updatedPLace;
  res.status(200).json({ place: updatedPLace });
};

const deletePlace = (req, res, next) => {
  const placeid = req.params.pid;

  if (!DUMMY_PLACES.find((p) => p.ID === placeid)) {
    throw new HttpError("No place would be found for the given ID", 404);
    console.log("No place could be find for the given place ID");
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.ID !== placeid);
  res.status(200).json({ message: "Deleted Place" });
};

exports.getPlaces = getPlaces;
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
