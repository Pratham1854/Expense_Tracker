const express=require("express")
const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/Expensecontroller");

const {protect}=require("../middleware/authmiddleware");
const router=express.Router();
router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel); // you may also want to fix spelling here
router.delete("/:id", protect, deleteExpense);
module.exports=router;