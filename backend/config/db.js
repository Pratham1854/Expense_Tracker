const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{});
        console.log("mongo db connected")
    }catch(err){
        console.error("error connecting",err);
        process.exit(1);

    }
}
module.exports=connectDB;