const express = require ("express");
const router = express.Router();

const placesControllers=require('../controllers/places-controllers')

router.get('/',placesControllers.getPlaces);
router.get('/:pid',placesControllers.getPlaceById);

router.get('/user/:uID',placesControllers.getPlaceByUserId);

router.post('/', placesControllers.createPlace);
module.exports=router;
