const express=require("express")
const {protect}=require("../middleware/authmiddleware");
const {getDashbarddata}=require('../controllers/DashboardController')
const router=express.Router();
router.get("/",protect,getDashbarddata);
module.exports=router;