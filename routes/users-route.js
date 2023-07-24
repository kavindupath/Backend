const express = require ("express");
const router = express.Router();

const usersContollers=require('../controllers/users-controllers')

router.get('/',usersContollers.getUsers);

router.post('/signup',usersContollers.signup);

router.post('/login',usersContollers.login);

module.exports=router;
