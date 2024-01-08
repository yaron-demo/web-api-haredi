const jwt=require('jsonwebtoken');
const mysql=require('mysql');
module.exports={
    getAllProducts:function(req,res){
        let connection=global.conn;// שליפת הקונקשן מתוך הזכרון הגלובאלי        
      
       // הפעלת שאילתה מול בסיס הנתונים
       connection.query('SELECT * from t_products', function (error, results,fields) {
        if (error)
            return res.status(500).json({Err:error});
        else
            return res.status(200).json({Products:results});
        
      });   
    },
    getProductById:function(req,res){
        const Pid=req.params.id;
        // let token=req.headers.authorization.split(' ')[1];
        // let user=jwt.verify(token,"abc123");
        // console.log(req.id);
        let connection=global.conn;// שליפת הקונקשן מתוך הזכרון הגלובאלי
        
        // let token=jwt.sign({email:"ylapidot@gmail.com"},"abc123",{expiresIn:'1h'});
        // הפעלת שאילתה מול בסיס הנתונים
        connection.query(`SELECT * from t_products where Pid=${Pid}`, function (error, results,fields) {
         if (error)
             return res.status(500).json({Err:error});
         else
             return res.status(200).json({Products:results});
         
       });    
    },
    addProduct:function(req,res){
        const {Pid,Price,Pname}=req.body;
        console.log(req.Email);
        product.insertMany([{Pid,Price,Pname,Pdesc:"my Code"}]).then((status)=>{


            return res.status(200).json(status);
        })
        
    },
    updateProduct:function(req,res){
        const Pid=req.params.id;
        const {Price,Pname}=req.body;
        console.log(Pid);
        // const p=
        product.updateOne({Pid},{Pid,Price,Pname,Pdesc:"Update Pdesc"}).then((status)=>{

            return res.status(200).json(status);
        })


    },
    deleteProductById:function(req,res){
        const Pid=req.params.id;
      
        Product.deleteOne({Pid}).then((status)=>{
            return res.status(200).json(status);
        }); 
    }

}