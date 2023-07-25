const HttpError= require('../models/http-error');
const {v4:uuidv4} =require('uuid');
const {validationResult}= require('express-validator')

let DUMMY_PLACES=[
    {
        ID:'P1',
        Name:'Sigiriya',
        Creator:'u1',
        description:"This is a world heritance in Sri Lanka"
    },
    {
        ID:'P2',
        Name:'Galle Beach',
        Creator:'u2',
        description:"This is one of the popular beach in Sri Lanka"
    }
]

const getPlaces=(req,res,next)=>{
    console.log('places');
};

const getPlaceById = (req,res,next)=>{
    const placeId=req.params.pid;
    const place=DUMMY_PLACES.find(p=>{
        return p.ID===placeId
    });
  
    if(!place){
        const error= new HttpError('Could not find a place for a given id',404);
        throw error; // already cancels the function execution so no need to call 'return'
    }
    res.json({place});
};

const getPlacesByUserId= (req, res,next)=>{
    const userID=req.params.uID;
    
    const places= DUMMY_PLACES.filter(p=>{
        return p.Creator===userID;
    });
    if(!places  || places.length===0){
        const error= new HttpError('Could not find a places for a given user id',404);
        return next(error);
    }
    res.json({places});
};


const createPlace =(req, res)=>{

const validationError= validationResult(req);
if(!validationError.isEmpty()){
    console.log('Error in creating new places');
    throw new HttpError('invalid input passed please check your data',422);
}

const {Name, Creator,description} =req.body;
const createdPlace= {
    ID:uuidv4(),
    Name: Name,
    Creator:Creator,
    description:description
}

DUMMY_PLACES.push(createdPlace);
res.status(200).json({place:createdPlace});
};

const updatePlace =(req, res, next)=>{

    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      console.log("Error in updating places");
      throw new HttpError("invalid input passed please check your data", 422);
    }
    const { name, creator,description } = req.body;
    const placeId = req.params.pid;

    const updatedPLace = { ...DUMMY_PLACES.find((p) => p.ID === placeId) }; // use the spread operator
    const placeIndex = DUMMY_PLACES.findIndex((p) => p.ID === placeId);

    updatedPLace.Name = name;
    updatedPLace.Creator = creator;
    updatedPLace.description=description;

    DUMMY_PLACES[placeIndex] = updatedPLace;
    res.status(200).json({ place: updatedPLace });


};

const deletePlace = (req, res, next) =>{
    const placeid= req.params.pid;

    if(!DUMMY_PLACES.find(p=>p.ID===placeid)){
        throw new HttpError('No place would be found for the given ID',404);
        console.log('No place could be find for the given place ID')
    }
    DUMMY_PLACES=DUMMY_PLACES.filter(p=>p.ID!==placeid);
    res.status(200).json({message:'Deleted Place'});
    
};

exports.getPlaces=getPlaces;
exports.getPlaceById=getPlaceById;
exports.getPlacesByUserId=getPlacesByUserId;
exports.createPlace=createPlace;
exports.updatePlace= updatePlace;
exports.deletePlace=deletePlace;