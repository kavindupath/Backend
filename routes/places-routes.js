const express = require ("express");
const router = express.Router();
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
    //console.log('GET request in places')
    res.json({place});
});


router.get('/user/:uID',(req, res,next)=>{
    const userID=req.params.uID;
    const place= DUMMY_PLACES.find(p=>{
        return p.Creator===userID;
    })
    res.json({place});
});

module.exports=router;
