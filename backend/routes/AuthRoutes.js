const express = require("express");
const {protect}=require('../middleware/authmiddleware')
const {
    registeruser,
    loginuser,
    getuserinfo
} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");


const router = express.Router();

router.post('/register', registeruser);
router.post('/login', loginuser);
router.get('/getuser', protect, getuserinfo);
router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ message: "File uploaded successfully", imageUrl });
});

// Fix module export (should be 'exports' not 'export')
module.exports = router;

