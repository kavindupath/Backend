const express = require ("express");
const router = express.Router();

const placesControllers=require('../controllers/places-controllers')

router.get('/',placesControllers.getPlaces);

router.get('/:pid',placesControllers.getPlaceById);

router.get('/user/:uID',placesControllers.getPlacesByUserId);

router.post('/', placesControllers.createPlace);

router.patch('/:pid',placesControllers.updatePlace);

router.delete('/:pid', placesControllers.deletePlace);

module.exports=router;
