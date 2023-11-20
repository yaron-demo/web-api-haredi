const express=require('express');
const app=express();
const productRouter=require('./api/v1/routes/product');
const categoryRouter=require('./api/v1/routes/category');
const secure=require('./api/v1/middlewares/secure');
const myLogger=require('./api/v1/middlewares/logger');
const morgan=require('morgan');

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

// שילוב הראוטטרים בתוך האפליקציה
app.use('/product',productRouter);
app.use('/category',categoryRouter);

// נקודת קצה עבור נתיבים שלא נמצאו, 404 not found
app.all('*',(req,res)=>{
    res.status(404).json({msg:'404 not found'});
});

module.exports=app;