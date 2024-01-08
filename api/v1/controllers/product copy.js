
const product = require('../models/product');
const Product=require('../models/product');
const jwt=require('jsonwebtoken');

module.exports={
    getAllProducts:function(req,res){
        
        let token=jwt.sign({email:"ylapidot@gmail.com"},"abc123",{expiresIn:'1h'});
            Product.find().then((products)=>{
                return res.status(200).json({token,products});
            });    
    },
    getProductById:function(req,res){
        const Pid=req.params.id;
        let token=req.headers.authorization.split(' ')[1];
        let user=jwt.verify(token,"abc123");
        console.log(req.id);
        Product.findOne({Pid}).then((products)=>{            
            return res.status(200).json({user,products});
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