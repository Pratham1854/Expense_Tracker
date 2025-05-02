const express = require("express");
const Protect=require('../middleware/authmiddleware')
const {
    registeruser,
    loginuser,
    getuserinfo
} = require("../controllers/authController");


const router = express.Router();

router.post('/register', registeruser);
router.post('/login', loginuser);
router.get('/getuser', Protect, getuserinfo);

// Fix module export (should be 'exports' not 'export')
module.exports = router;

