const User=require("../models/User")
const xlsx=require("xlsx")
const Income=require("../models/Income")
exports.addIncome=async(req,res)=>{
    const userid=req.user.id;
    try{
        const{icon,source,amount,date}=req.body;
        if(!source || !amount || !date){
            return res.status(400).json({message:"all fields are required"})
        }
        const newIncome=new Income({
            userid,
            icon,
            source,
            amount,
            date:new Date(date)
        });
        await newIncome.save();
        res.status(200).json(newIncome);
    }catch(error){
        res.status(500).json({message:"Server error"})
    }
}

exports.getAllIncome=async(req,res)=>{
    const userid=req.user.id;
    try{
        const income=await Income.find({userid}).sort({date:-1});
        res.json(income);
    } 
    catch(error){
        res.status(500).json({message:"server error"})
    }
}

exports.deleteIncome=async(req,res)=>{
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message:"deleted"})
    } 
    catch(error){
        res.status(500).json({message:"server error"})
    }
}

exports.downloadIncomeExcel = async (req, res) => {
    const userid = req.user.id;
    try {
        const income = await Income.find({ userid }).sort({ date: -1 });

        const data = income.map((item) => ({
            Source: item.source,
            amount: item.amount,
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "income");

        // Save the file to disk
        const filePath = "income_details.xlsx";
        xlsx.writeFile(wb, filePath);

        // Send file as download
        res.download(filePath);
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
};
