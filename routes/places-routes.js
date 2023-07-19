const express = require ("express");
const router = express.Router();
const HttpError= require('../models/http-error');

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

router.get('/',(req,res, next)=>{
    console.log('GET request in places')
    res.json({message :'It is a GET with no parameters'});
});

router.get('/:pid',(req,res, next)=>{
    const placeId=req.params.pid;
    const place=DUMMY_PLACES.find(p=>{
        return p.ID===placeId
    })
  
    if(!place){
        const error= new HttpError('Could not find a place for a given id',404);
        throw error; // already cancels the function execution so no need to call 'return'
    }
    res.json({place});
});

router.get('/user/:uID',(req, res,next)=>{
    const userID=req.params.uID;
    const place= DUMMY_PLACES.find(p=>{
        return p.Creator===userID;
    })

    if(!place){
        const error= new HttpError('Could not find a place for a given user id',404);
        return next(error);
    }
    res.json({place});
});

module.exports=router;
