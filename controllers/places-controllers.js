const HttpError= require('../models/http-error');
const {v4:uuidv4} =require('uuid');

let DUMMY_PLACES=[
    {
        ID:'P1',
        Name:'Sigiriya',
        Creator:'u1'
    },
    {
        ID:'P2',
        Name:'Galle Beach',
        Creator:'u2'
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
    res.json({place});
};


const createPlace =(req, res)=>{
const {name, creator} =req.body;
const createdPlace= {
    ID:uuidv4(),
    Name: name,
    Creator:creator
}

DUMMY_PLACES.push(createdPlace);
res.status(200).json({place:createdPlace});
};

const updatePlace =(req, res, next)=>{
    const {name, creator} =req.body;
    const placeId=req.params.pid;

    const updatedPLace={...DUMMY_PLACES.find(p=>p.ID===placeId)}; // use the spread operator
    const placeIndex= DUMMY_PLACES.findIndex(p=>p.ID===placeId);

    updatedPLace.Name=name;
    updatedPLace.Creator=creator;

    DUMMY_PLACES[placeIndex]=updatedPLace;
    res.status(200).json({place:updatedPLace});


};

const deletePlace = (req, res, next) =>{
    const placeid= req.params.pid;
    DUMMY_PLACES=DUMMY_PLACES.filter(p=>p.ID!==placeid);
    res.status(200).json({message:'Deleted Place'});
    
};

exports.getPlaces=getPlaces;
exports.getPlaceById=getPlaceById;
exports.getPlacesByUserId=getPlacesByUserId;
exports.createPlace=createPlace;
exports.updatePlace= updatePlace;
exports.deletePlace=deletePlace;