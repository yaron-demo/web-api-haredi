const User=require('../models/user');
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');
module.exports={

    SignIn:(req,res)=>{
        const {Email,Pass}=req.body;
        User.find({Email}).then((users)=>{
            if(users.length==0)// במידה ולא נמצא משתמש עם המייל הנוכחי
            {
                return res.status(400).json({Msg:"Username and Pass are wrong"});
            }
            else
            {
                const user=users[0];
                bcrypt.compare(Pass,user.Pass).then((status)=>{
                    if(!status)
                    {
                        return res.status(200).json({Msg:"Username and Pass are wrong"});
                    }
                    else
                    {
                        const token=jwt.sign({Email},process.env.PRIVATE_KEY,{expiresIn:'1h'});
                        return res.status(200).json({Msg:"Connected Successfuly",token});
                    }
                });
            } });

    },
    SignUp:(req,res)=>{
        // הרשמת משתמש חדש
       const {Email,Pass,FullName,Phone}=req.body;
       // לפני ההרשמה נוודא שלא קיים משתמש נוסף עם אותו שם משתמש
      User.find({Email}).then((users)=>{
        if(users.length>0)
        {
            return res.status(200).json({Msg:"User Already Exist"});
        }
        else
        {
            bcrypt.hash(Pass,10).then((hash)=>{
                User.insertMany([{Email,Pass:hash,FullName,Phone}]).then((resp)=>{
                    return res.status(200).json({resp});
    
                }).catch((err)=>{
                    return res.status(500).json({Msg:err});
                  });
    
            }).catch((err)=>{
                return res.status(500).json({Msg:err});
              });
        }
       
       


      }).catch((err)=>{
        return res.status(500).json({Msg:err});
      });
      
       

    }
}