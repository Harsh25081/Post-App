const express = require("express")
const mongoose = require("mongoose")
const route = require("./route/route")
const app = express()

app.use(express.json())

const cors = require('cors')
app.use(cors({
    origin: '*'
}));

mongoose.connect("mongodb+srv://harsh258:Wb5QwC0mG0iUBIXS@new-cluster.baoq1vx.mongodb.net/Post_App-DB",{useNewUrlParser: true})
.then(()=>console.log("MongoDB is Connected"))
.catch((error)=>console.log(error))

app.use("/",route)

app.use((req,res)=>{
    res.status(404).send({status:false,message:"URL not found"})
})

app.listen(process.env.PORT || 3001 , ()=>{console.log("Express App is running on PORT "+(process.env.PORT||3001))})