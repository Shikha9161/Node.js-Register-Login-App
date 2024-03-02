const mongoose=require('mongoose')
const model=mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
    email_address:{type:String},
    password:{type:String},
    college_name:{type:String},
    address:{type:String},
    dob:{type:String},
    mobile_no:{type:String}
})
module.exports=mongoose.model("student_reg_data",model)