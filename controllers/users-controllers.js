const {v4:uuidv4} =require('uuid');
const HttpError= require('../models/http-error');
const {validationResult}= require('express-validator')


const DUMMY_USERS=[
    {
        id:'u1',
        name:'Lando Norris',
        email:'lando@gmail.com',
        password:'lando'
    },
    {
        id:'u2',
        name:'Alex Albon',
        email:'alex@gmail.com',
        password:'albon'
    },
    {
        id:'u3',
        name:'Charles lecrec',
        email:'charles@gmail.com',
        password:'charles'
    }
]

const getUsers = (req, res, next)=>{

    res.json({users:DUMMY_USERS});
};

const signup = (req, res, next)=>{

    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      console.log("Error in Signing");
      throw new HttpError("invalid input passed please check your data", 422);
    }

    const {name, email, password}= req.body;
    const hasUserAlreadyExist= DUMMY_USERS.find(u=>u.email===email);

    if(hasUserAlreadyExist){
        res.json({message:'User already exists'})
    }
    const createdUser={
        id:uuidv4(),
        name,
        email,
        password
    };

    DUMMY_USERS.push(createdUser);
    res.status(200).json({user:createdUser});
};

const login = (req, res, next)=>{
    const {email, password}= req.body;
    const identifiedUser= DUMMY_USERS.find(u=>u.email===email);

    if(!identifiedUser || identifiedUser.password!== password){
        throw new HttpError('Could not identify the user',401);
    }

    res.json({message: 'Logged in'})
};


exports.getUsers=getUsers;
exports.signup=signup;
exports.login=login;