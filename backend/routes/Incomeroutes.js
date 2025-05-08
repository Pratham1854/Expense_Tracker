const express=require("express")
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");

const {protect}=require("../middleware/authmiddleware");
const router=express.Router();
router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel); // you may also want to fix spelling here
router.delete("/:id", protect, deleteIncome);
module.exports=router;