const mongoose= require('mongoose');
const uniqueValidator= require('mongoose-unique-validator')
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true, minlength:6},
    image:{type:String, required:true},
    places:{type: String, required:true}
});

//validate whether the email is unique. Making the email property unique as in above only create a index in db
userSchema.plugin(uniqueValidator);

module.exports=mongoose.model('User',userSchema);