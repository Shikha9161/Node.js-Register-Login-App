const express=require('express')
require("./database/connection")

const app=express()
const model=require('./models/reg_model')
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello")
})
app.listen(5000,()=>console.log("Server Started"))

app.post("/api/st/registration", async (req, res) => {   
    console.log(req.body);
    // res.send(req.body)
    try {
        const user = new model(req.body)
        //console.log(`mobile number : ${user.phone_no}`);

        let mn=user.mobile_no;
        let eid=user.email_address;

        const existing_mn = await model.findOne({mobile_no: mn});
        const existing_id = await model.findOne({email_address:eid});
        

        //console.log(`mobile number : ${existing_mn }`);
        // return 
        if (existing_mn==null && existing_id==null) {
            await user.save()
            res.send({
                status:1,
                msg: "data insert successfully",
                data: req.body
            })
            
        } else {
            res.send({
                status:0,
                msg: "mobile number or email already exit",
                data: req.body
            })

        }


    } catch (err) {
        res.send({
            status:0,
            mas: "something went wrong!",
            data: err
        })
    }
})


app.post("/api/st/login", async (req, res) => {

    try {

        const email = req.body.email_address
        const password = req.body.password
        const existing_email = await model.findOne({ email_address: email });
        const existing_password = await model.findOne({ password: password });


        console.log(`mobile number : ${existing_email },${existing_email }`);
        // return 
        if (existing_email != null) {

            if (existing_password != null) {

                res.send({
                    status: 1,
                    msg: "login success",
                    data: existing_password
                })
            } else {
                res.send({
                    status: 0,
                    msg: "Enter correct password",
                    data: req.body
                })
            }


        } else {
            res.send({
                status: 0,
                msg: "this user not exit",
                data: req.body
            })

        }


    } catch (err) {
        res.send({
            status: 0,
            mas: "something went wrong!",
            data: err
        })
    }

})

