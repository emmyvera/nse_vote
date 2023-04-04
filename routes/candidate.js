const router = require("express").Router()
const verify = require("../config/validateAdmin")
const db = require("../database/dbConnect")

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

statement = prStatement + vpStatement + gsStatement + agsStatement +
            tsStatement + atsStatement + fsStatement + tStatement +
            psStatement + aStatement + eo1Statement + eo2Statement

router.get("/", verify, (req, res) => {
  db.query(statement, (err, result) => {
    res.render("candidate", {result})
  })
})

router.get("/logout", (req, res)=> {
  res.cookie('auth',null)
  res.redirect("/admin")
})

module.exports = router