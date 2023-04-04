const router = require("express").Router()
const verify = require("../config/validateAdmin")
const db = require("../database/dbConnect")

count_statement = "SELECT COUNT(*) AS member FROM `users_info`; "
no_voted = "SELECT COUNT(*) AS no_voted FROM `users_info` WHERE `vote_status` = 1; "
prStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 1 ORDER BY `candidate_info`.`vote_count` DESC; "
vpStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 2 ORDER BY `candidate_info`.`vote_count` DESC; "
gsStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 3 ORDER BY `candidate_info`.`vote_count` DESC; "
agsStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 4 ORDER BY `candidate_info`.`vote_count` DESC; "

tsStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 5 ORDER BY `candidate_info`.`vote_count` DESC; "
atsStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 6 ORDER BY `candidate_info`.`vote_count` DESC; "
fsStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 7 ORDER BY `candidate_info`.`vote_count` DESC; "
tStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 8 ORDER BY `candidate_info`.`vote_count` DESC; "

psStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 9 ORDER BY `candidate_info`.`vote_count` DESC; "
aStatement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 10 ORDER BY `candidate_info`.`vote_count` DESC; "
eo1Statement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 11 ORDER BY `candidate_info`.`vote_count` DESC; "
eo2Statement = "SELECT * FROM `candidate_info` WHERE `candidate_info`.`candidate_id` = 12 ORDER BY `candidate_info`.`vote_count` DESC; "

mStatement = count_statement + no_voted + prStatement + vpStatement + gsStatement +
                agsStatement + tsStatement + atsStatement + fsStatement + tStatement +
                psStatement + aStatement + eo1Statement + eo2Statement

router.get("/", verify, (req, res)=> {
    pres_name = []
    pres_vote = []
    vp_name = []
    vp_vote = []
    gs_name = []
    gs_vote = []
    ags_name = []
    ags_vote = []

    ts_name = []
    ts_vote = []
    ats_name = []
    ats_vote = []
    fs_name = []
    fs_vote = []
    t_name = []
    t_vote = []

    ps_name = []
    ps_vote = []
    a_name = []
    a_vote = []
    eo1_name = []
    eo1_vote = []
    eo2_name = []
    eo2_vote = []


    db.query(mStatement, (err, result) =>{

        for (let i = 0; i < result[2].length; i++) { // Chairman
            pres_name.push(result[2][i].name)
            pres_vote.push(result[2][i].vote_count)
        }

        for (let i = 0; i < result[3].length; i++) { // Vice Chairman
            vp_name.push(result[3][i].name)
            vp_vote.push(result[3][i].vote_count)
        }

        for (let i = 0; i < result[4].length; i++) { // Gen. Secretary
            gs_name.push(result[4][i].name)
            gs_vote.push(result[4][i].vote_count)
        }

        for (let i = 0; i < result[5].length; i++) { // Ast. Gen. Sec.
            ags_name.push(result[5][i].name)
            ags_vote.push(result[5][i].vote_count)
        }

        for (let i = 0; i < result[6].length; i++) { // Tech Sec
            ts_name.push(result[6][i].name)
            ts_vote.push(result[6][i].vote_count)
        }

        for (let i = 0; i < result[7].length; i++) { // Ast Tech Sec
            ats_name.push(result[7][i].name)
            ats_vote.push(result[7][i].vote_count)
        }

        for (let i = 0; i < result[8].length; i++) { // Fin Sec
            fs_name.push(result[8][i].name)
            fs_vote.push(result[8][i].vote_count)
        }

        for (let i = 0; i < result[9].length; i++) { // Treas
            t_name.push(result[9][i].name)
            t_vote.push(result[9][i].vote_count)
        }

        for (let i = 0; i < result[10].length; i++) { // Pub Sec
            ps_name.push(result[10][i].name)
            ps_vote.push(result[10][i].vote_count)
        }

        for (let i = 0; i < result[11].length; i++) { // Aud
            a_name.push(result[11][i].name)
            a_vote.push(result[11][i].vote_count)
        }

        for (let i = 0; i < result[12].length; i++) { // Ex-O1
            eo1_name.push(result[12][i].name)
            eo1_vote.push(result[12][i].vote_count)
        }

        for (let i = 0; i < result[13].length; i++) { // Ex-O2
            eo2_name.push(result[13][i].name)
            eo2_vote.push(result[13][i].vote_count)
        }

        res.render("monitor", {result, pres_name, pres_vote,
                                vp_name, vp_vote, gs_name, gs_vote,
                                ags_name, ags_vote, ts_name, ts_vote,
                                ats_name, ats_vote, fs_name, fs_vote,
                                t_name, t_vote, ps_name, ps_vote,
                                a_name, a_vote, eo1_name, eo1_vote,
                                eo2_name, eo2_vote})
    })
})


router.get("/logout", (req, res)=> {
    res.cookie('auth',null)
    res.redirect("/admin")
})


module.exports = router