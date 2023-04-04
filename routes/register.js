const router = require("express").Router()
const verify = require("../config/validateAdmin")
const db = require("../database/dbConnect")


router.get("/", verify, (req, res)=> {
    const post = "SELECT * FROM `candidate_post`"

    db.query(post, (err, result) => {
        res.render("register",{result})
    })

})

// Member Reg
router.post("/member", verify, (req, res)=> {
    const {mName, mEmail, mPhone} = req.body
    // Check For Undefine
    if(typeof(mName) === 'undefined' | typeof(mPhone) === 'undefined' |typeof(mEmail) === 'undefined'){
        res.redirect("/register")
    } else{
        // Check If email exist already
        const userValidStm = "SELECT `email` FROM `users_info` WHERE `email` = ?"
        db.query(userValidStm, [mEmail], (err, result) => {
            if (result.length !== 0) {
                res.redirect("/register")
            }else{
                insertStatement = "Insert Into `users_info` (`email`, `phone`, `name`) VALUES (?,?,?)"
                db.query(insertStatement, [mEmail, mPhone, mName])
                res.redirect("/register")
            }
        })
    }
})

// For President
router.post("/post", verify, (req, res)=>{
    const {name, post} = req.body
    // Check For Undefine

    if(typeof(name) === 'undefined' | typeof(post) === 'undefined'){
        res.redirect("/register")
    } else{
        // Check If Name exist already
        const ValidStm = "SELECT `name`, `candidate_id`  FROM `candidate_info` WHERE `name` = ? AND `candidate_id` = ?"
        db.query(ValidStm, [name, post], (err, result) => {
            if (result.length !== 0) {
                res.redirect("/register")
            }else{
                insertStatement = "Insert Into `candidate_info` (`name`, `candidate_id`) VALUES (?, ?)"
                db.query(insertStatement, [name, post])
                res.redirect("/register")
            }
        })
    }
})

router.get("/logout", (req, res)=> {
    res.cookie('auth',null)
    res.redirect("/admin")
})


module.exports = router