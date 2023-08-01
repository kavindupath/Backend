const mongoose =require('mongoose');
const Schema= mongoose.Schema;

const placeSchema= new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    address: {type: String, required: true},
    location:{
        lat:{type: Number, required: true},
        lng:{type: Number, required: true}
    },
    creator:{type: String, required: true}
});

// here the schema is kind of a structure. We export a model based on the structure
// So the exporting model is 'Place'. it is based on the placeSchema structure
//Once the model is used to either create a new place, a collection will be created with documentes based on the name 'Place'(not exactly the Place name)
module.exports=mongoose.model('Place', placeSchema);