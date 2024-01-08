const router=require('express').Router();
const {SignIn,SignUp}=require('../controllers/user');
router.post('/login',SignIn);
router.post('/register',SignUp);

module.exports=router;