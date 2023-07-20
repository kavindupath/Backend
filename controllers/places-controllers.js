const HttpError= require('../models/http-error');
const uuid =require('uuid/v4');

const DUMMY_PLACES=[
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

const getPlaceByUserId= (req, res,next)=>{
    const userID=req.params.uID;
    const place= DUMMY_PLACES.find(p=>{
        return p.Creator===userID;
    });
    
    if(!place){
        const error= new HttpError('Could not find a place for a given user id',404);
        return next(error);
    }
    res.json({place});
};


const createPlace =(req, res)=>{
const {Name, Creator} =req.body;
const createdPlace= {
    ID:uuid(),
    Name: Name,
    Creator:Creator
}

DUMMY_PLACES.push(createdPlace);
res.status(200).json({place:createdPlace});
};

exports.getPlaces=getPlaces();
exports.getPlaceById=getPlaceById();
exports.getPlaceByUserId=getPlaceByUserId();
exports.createPlace=createPlace();