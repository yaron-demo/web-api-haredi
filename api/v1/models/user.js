// חיבור לספריית מונגוס לשם עבודה עם מונגו דיבי
const mongoose=require('mongoose');
//mongoose.pluralize(null);
// יצירת סכימה עבור עבודה עם האוסף/טבלה של משתמשים
const UserSchema=mongoose.Schema({
Email:String,
Pass:String,
FullName:String,
Phone:String


});
// יצירת מודל שישממש לפנייה לאוסף / טבלה של משתמשים
module.exports=mongoose.model('users',UserSchema);