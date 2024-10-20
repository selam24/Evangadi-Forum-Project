const express = require("express");
const router = express.Router();

const {
  question,
  Allquestion,
  getSingleQuestion,
} = require("../Controller/questionController");
router.post("/question", question);
router.get("/question", Allquestion);
router.get("/question/:question_id", getSingleQuestion);
module.exports = router;
