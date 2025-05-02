const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")
const Userschema=new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profileImageUrl:{type:String ,default:null},
},
{timestamps:true}
);
//hash pass before saving
Userschema.pre("save",async function(next) {
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
    
})
//compare
Userschema.methods.comparePassword=async function(candidatepassword) {
    return await bcrypt.compare(candidatepassword,this.password);
    
};
module.exports=mongoose.model("User",Userschema)