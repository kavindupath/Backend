const mongoose= require('mongoose');
const uniqueValidator= require('mongoose-unique-validator')
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true, minlength:6},
    image:{type:String, required:true},
    places:[{type:mongoose.Types.ObjectId, required: true, ref:'Place'}] //One user can have multiple places
});

//validate whether the email is unique. Making the email property unique as in above only create a index in db
// Apply the uniqueValidator plugin to the schema
userSchema.plugin(uniqueValidator);

module.exports=mongoose.model('User',userSchema);