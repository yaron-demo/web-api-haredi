const router=require('express').Router();
// קטגוריות
router.get('/',function(req,res){});
// נקודת קצה לקבלת פרטי מוצר לפי קוד מוצר
router.get('/:id',function(req,res){});
// נקודת קצה לעדכון פרטי מוצר לפי קוד מוצר
router.patch('/:id',function(req,res){});
// נקודת קצה למחיקת  מוצר לפי קוד מוצר
router.delete('/:id',function(req,res){});
//הוספת מוצר חדש
router.post('/',function(req,res){});

module.exports=router;