const jwt=require('jsonwebtoken');
// כאן נבצע אימות של הטוקן
module.exports=(req,res,next)=>{
    try{
          // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InlsYXBpZG90QGdtYWlsLmNvbSIsImlhdCI6MTcwMjkyMzU2NywiZXhwIjoxNzAyOTI3MTY3fQ.pTrNPBW2m5EM_sOpvXXicS56Tkp4fABc34aUH8o-i8Y
     const str=req.headers.authorization;
     const arrSt=str.split(' ');
     const token=arrSt[1];
       const EmailObj=jwt.verify(token,process.env.PRIVATE_KEY);
        req.Email=EmailObj;
       next();
    }
    catch(error)
    {
        console.log(error);
        return res.status(401).json({Msg:"You are not authorized"});
    }
    
 };