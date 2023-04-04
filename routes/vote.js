const router = require("express").Router()
const verify = require("../config/validate")
const db = require("../database/dbConnect")

const prStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 1; "
const vpStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 2; "
const gsStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 3; "
const agsStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 4; "

const tsStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 5; "
const atsStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 6; "
const fsStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 7; "
const tStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 8; "

const psStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 9; "
const aStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 10; "
const eo1Statement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 11; "
const eo2Statement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 12; "

const statement = prStatement + vpStatement + gsStatement + agsStatement +
                    tsStatement + atsStatement + fsStatement + tStatement +
                    psStatement + aStatement + eo1Statement + eo2Statement


router.get("/", verify, async (req, res) => {
    db.query(statement, (err, result)=>{
        pres_result = result[0]
        vp_result = result[1]
        sec_result = result[2]
        ags_result = result[3]

        ts_result = result[4]
        ats_result = result[5]
        fs_result = result[6]
        t_result = result[7]

        ps_result = result[8]
        a_result = result[9]
        eo1_result = result[10]
        eo2_result = result[11]

        res.render("error-404") 
                   
//                    {pres_result, vp_result, sec_result, ags_result,
//                             ts_result, ats_result, fs_result, t_result,
//                             ps_result, a_result, eo1_result, eo2_result})
    })

})

// Function For Voting Takes The Name And Position
function updateVote(vote, post){
    if (typeof vote !== 'undefined'){
        state = "Select `vote_count` From `candidate_info` Where `name` = ? AND `candidate_info`.`candidate_id` = ?"

        db.query(state, [vote, post], (err, result) => {
            var res = result[0].vote_count
            res = res + 1

            vote_state = "Update `candidate_info` Set `vote_count` = ? Where `name` = ? AND `candidate_info`.`candidate_id` = ?"
            db.query(vote_state, [res, vote, post], (err, result1) => {
                
            })
        })
    }
}

router.post("/", verify, (req, res) => {
    //id = req.cookies.auth
    id = req.id.id

    var pres = req.body.pres
    var vp = req.body.vp
    var sec = req.body.sec
    var ags = req.body.ags

    var ts = req.body.ts
    var ats = req.body.ats
    var fs = req.body.fs
    var t = req.body.t

    var ps = req.body.ps
    var a = req.body.a
    var eo1 = req.body.eo1
    var eo2 = req.body.eo2

    if (typeof ags === 'undefined' | typeof sec === 'undefined' | typeof vp === 'undefined' | typeof pres === 'undefined' |
        typeof ts === 'undefined' | typeof ats === 'undefined' |typeof fs === 'undefined' | typeof t === 'undefined' |
        typeof ps === 'undefined' | typeof a === 'undefined' | typeof eo1 === 'undefined' | typeof eo2 === 'undefined'){
        res.redirect("/vote")
    } else {

        updateVote(pres, "1")
        updateVote(vp, "2")
        updateVote(sec, "3")
        updateVote(ags, "4")

        updateVote(ts, "5")
        updateVote(ats, "6")
        updateVote(fs, "7")
        updateVote(t, "8")

        updateVote(ps, "9")
        updateVote(a, "10")
        updateVote(eo1, "11")
        updateVote(eo2, "12")

    upstate = "Update `users_info` Set `vote_status` = 1 Where `id` = ?"
    db.query(upstate, [id], (err, result) => {
        
    })
    res.cookie('auth',null)
    res.redirect("/")
    }
})

module.exports = router
