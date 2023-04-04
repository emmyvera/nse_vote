const express = require("express")
const app = express()
const db = require("./database/dbConnect")
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const config = require("./config")


app.use(cookieParser())
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(flash());

app.use(session({
    secret:'geeksforgeeks',
    saveUninitialized: true,
    resave: true
}));
db.connect(async(err) => {
    if(err){
        throw err
    }
    const dbOn = await console.log("The Database is up and running...")
})

//Route
const login = require("./routes/login")
app.use("/", login)

const vote = require("./routes/vote")
app.use("/vote", vote)

// const result = require("./routes/result")
// app.use("/result", result)

const admin = require("./routes/admin")
app.use("/admin", admin)

const adminDashboard = require("./routes/adminDashboard")
app.use("/adminDashboard", adminDashboard)

const members = require("./routes/members")
app.use("/members", members)

const candidate = require("./routes/candidate")
app.use("/candidate", candidate)

const register = require("./routes/register")
app.use("/register", register)

const result = require("./routes/result")
app.use("/result", result)

app.use((req, res,next)=>{
    res.status(404).render('error-404');
 });

app.listen(config.PORT, ()=>{
    console.log(`This Webapp is available on the right port...`)
})