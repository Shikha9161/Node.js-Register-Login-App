const mongoose=require('mongoose')

const model1=mongoose.Schema({
    st_name:{type:String},
    st_email:{type:String},
    st_mobile:{type:String}
})

module.exports=mongoose.model("stu_contact_data",model1)