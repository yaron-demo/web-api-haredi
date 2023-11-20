module.exports=(req,res,next)=>{
    //לבדוק במידה והראוט הוא ל אדמין, לבדוק האם מורשה
       if(req.url=='/admin')
        {
            let ip=req.ip;// שמירת כתובת ה IP של המשתמש
            let status=arrip.find((el)=>el==ip);        
            if(!status)          
               return res.status(401).json({Msg:'You are not authorized'});
        }
        next();
    };