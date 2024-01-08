const express=require('express');
const app=express();
const productRouter=require('./api/v1/routes/product');
const categoryRouter=require('./api/v1/routes/category');
const secure=require('./api/v1/middlewares/secure');
const myLogger=require('./api/v1/middlewares/logger');
const morgan=require('morgan');
const mongoose=require('mongoose');
const product = require('./api/v1/controllers/product');
const UserRouter=require('./api/v1/routes/user');
const Auth=require('./api/v1/middlewares/auth');
const mysql=require('mysql');
async function ConnectToDb()
{
    await mongoose.connect(process.env.MONGO);
    console.log('connected to db');
}
ConnectToDb();
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'yossi', 
    password : 'yaron123',
    database : 'ecomdb'
  });
 
  connection.connect((err)=>{
    if(!err)
        console.log('connected to mysql');
    else
        console.log( err);
  })
  global.conn=connection;
//mongoose.connect(process.env.MONGO).then((status)=>{console.log('connected to db');})
// יצירת סכימה עבור האוסף של מוצרים



//.then(()=>{console.log('connected to mongo db')});
// נבצע חיבור לבסיס הנתונים וניצור קונקשן באמצעות מחרוזת ההתחברות


let arrip=['127.0.0.1','::1','162.3.6.5','1.1.1.1','2.2.2.2'];
app.use(secure);
app.use(myLogger);
app.use(morgan('dev'));
// הוספת שכבה לטיפול בבקשות שנשלחו בפורמט JSON
app.use(express.json());

// הוספת שכבה לטיפול בבקשות שנשלחו בפורמט Url Encoded
app.use(express.urlencoded({
    extended:false
}));
// app.get('vvv',(req,res)=>{

// ;

// })

// שילוב הראוטטרים בתוך האפליקציה
//app.use(Auth);
app.use('/product',productRouter);
app.use('/category',Auth,categoryRouter);
app.use('/account',UserRouter);
// נקודת קצה עבור נתיבים שלא נמצאו, 404 not found
app.all('*',(req,res)=>{
    res.status(404).json({msg:'404 not found'});
});

module.exports=app;