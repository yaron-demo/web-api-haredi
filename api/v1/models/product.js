const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    Pid:Number,
    Pname:String,
    Price:Number,
    Pdesc:String,
    Picname:String
    
    });
    module.exports=mongoose.model('products',productSchema);