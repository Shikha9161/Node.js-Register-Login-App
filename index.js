const express = require('express')
require("./database/connection")
const bodyParser = require('body-parser');
const app = express()
const model = require('./models/reg_model')
const model1 = require('./models/st_contact_model')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/view/login.html")
})
app.get('/registration', (req, res) => {
    res.sendFile(__dirname + "/view/registration.html")
})
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + "/view/st_contact.html")
})


app.listen(5000, () => console.log("Server Started"))

app.post("/api/st/registration", async (req, res) => {
    console.log(req.body);
    // res.send(req.body)
    try {
        const user = new model(req.body)
        //console.log(`mobile number : ${user.phone_no}`);

        let mn = user.mobile_no;
        let eid = user.email_address;

        const existing_mn = await model.findOne({ mobile_no: mn });
        const existing_id = await model.findOne({ email_address: eid });


        //console.log(`mobile number : ${existing_mn }`);
        // return 
        if (existing_mn == null && existing_id == null) {
            await user.save()
            // alert("Registration successfully!")
            res.sendFile(__dirname + "/view/login.html")

        } else {
            // alert("mobile number or email already exit")
            res.sendFile(__dirname + "/view/registration.html")

        }


    } catch (err) {
        res.send({
            status: 0,
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



        // return 
        if (existing_email != null) {

            console.log(`mobile number : ${existing_email.password}`);
            const pass = existing_email.password      //2==="2" false  2=="2"  true

            if (password == pass) {

                res.send({
                    status: 1,
                    msg: "login success",
                    data: existing_email
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

app.post("/api/st/contact", async (req, res) => {
    console.log(req.body);
    // res.send(req.body)
    try {
        const user = new model1(req.body)
        //console.log(`mobile number : ${user.phone_no}`);

        let mn = user.st_mobile;
        let eid = user.st_email;

        const existing_mn = await model1.findOne({ st_mobile: mn });
        const existing_id = await model1.findOne({ st_email: eid });


        //console.log(`mobile number : ${existing_mn }`);
        // return 
        if (existing_mn == null && existing_id == null) {
            await user.save()
            // alert("Registration successfully!")
            //res.sendFile(__dirname+"/view/login.html")
            res.send("data insert successfully")

        } else {
            // alert("mobile number or email already exit")
            //res.sendFile(__dirname+"/view/registration.html")
            res.send("Email and mobile no already exists")

        }


    } catch (err) {
        res.send({
            status: 0,
            mas: "something went wrong!",
            data: err
        })
    }
})


app.post("/api/finduser", async (req, res) => {
    try {
        const f_name = req.body.name
        const data = await model.findOne({ first_name: f_name });

        if (data != null) {
            res.send({ data: data })


        }
        else {
            res.send({
                msg: "does not match",
                data:data
            })
        }
    }

    catch (err) {
        res.send({
            msg: "something went wrong"
        })
    }



})



