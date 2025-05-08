const User=require("../models/User")
const xlsx=require("xlsx")
const Expense=require("../models/Expense")
exports.addExpense=async(req,res)=>{
    const userid=req.user.id;
    try{
        const{icon,category,amount,date}=req.body;
        if(!category || !amount || !date){
            return res.status(400).json({message:"all fields are required"})
        }
        const newExpense=new Expense({
            userid,
            icon,
            category,
            amount,
            date:new Date(date)
        });
        await newExpense.save();
        res.status(200).json(newExpense);
    }catch(error){
        res.status(500).json({message:"Server error"})
    }
}

exports.getAllExpense=async(req,res)=>{
    const userid=req.user.id;
    try{
        const expense=await Expense.find({userid}).sort({date:-1});
        res.json(expense);
    } 
    catch(error){
        res.status(500).json({message:"server error"})
    }
}

exports.deleteExpense=async(req,res)=>{
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"deleted"})
    } 
    catch(error){
        res.status(500).json({message:"server error"})
    }
}

exports.downloadExpenseExcel = async (req, res) => {
    const userid = req.user.id;
    try {
        const expense = await Expense.find({ userid }).sort({ date: -1 });

        const data = expense.map((item) => ({
            category: item.category,
            amount: item.amount,
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "expense");

        // Save the file to disk
        const filePath = "expense_details.xlsx";
        xlsx.writeFile(wb, filePath);

        // Send file as download
        res.download(filePath);
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
};
