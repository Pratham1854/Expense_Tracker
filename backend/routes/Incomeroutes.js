const express=require("express")
const{
    addincome,
    getallincome,
    deleteincome,
    downloadincomeexcel
}=require("../controllers/incomeController");
const {protect}=require("../middleware/authmiddleware");
const router=express.Router();
router.post("/add",protect,addincome);
router.get("/get",protect,getallincome);
router.get("/dowloadexcel",protect,downloadincomeexcel);
router.delete("/:id",protect,deleteincome);
module.exports=router;