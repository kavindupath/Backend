const {v4:uuidv4} =require('uuid');
const HttpError= require('../models/http-error');
const {validationResult}= require('express-validator')
const User=require('../models/user');


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

const signup = async (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    console.log("Error in Signing");
    return next(new HttpError("invalid input passed please check your data", 422)); 
  }

  const { name, email, password, places } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log("Somehting went wrong" + error);
    return res.status(500).json({ message: "Something went wrong" });
  }

  if (existingUser) {
    console.log("User Exits already!");
    res
      .status(422)
      .json({ message: "User Exits already!, please log in instead!" });
  }
  const createdUser = new User({
    name,
    email,
    image: "sample image",
    password,
    places,
  });

  try {
    await createdUser.save();
    res.status(200).json({ user: createdUser.toObject({ getter: true }) });
    console.log("A new user registered");
  } catch (err) {
    console.log("Could regisster the new user" + error);
    res.status(500).json({ message: "Could regisster the new user" });
    return;
  }
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