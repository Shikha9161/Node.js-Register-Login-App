const mongoose=require('mongoose')
const MONGO_DB_URL="mongodb://0.0.0.0:27017"
mongoose.connect(MONGO_DB_URL,{
    dbName:"demo"
})
.then(()=>console.log("Connected Successfully"))
.catch((err)=>console.log(`error: ${err}`))
