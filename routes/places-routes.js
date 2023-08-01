const express = require ("express");
const router = express.Router();
const {check} = require('express-validator');

const placesControllers=require('../controllers/places-controllers')

router.get('/',placesControllers.getPlaces);

router.get('/:pid',placesControllers.getPlaceById);

router.get('/user/:uID',placesControllers.getPlacesByUserId);

//Check () is another express middleware used for validating 
router.post('/',[check('title').not().isEmpty(),check('creator').not().isEmpty()], placesControllers.createPlace);

router.patch('/:pid',[check('title').not().isEmpty()],placesControllers.updatePlace);

router.delete('/:pid', placesControllers.deletePlace);

module.exports=router;
