const express = require("express");
const router=express.Router()
// const authMiddleware = require("../middlewear/authMiddleware")

const {
  postAnswer,
  getAnswer,
} = require("../Controller/answerController");
router.post("/answer/:questionid", postAnswer);
router.get("/:questionid", getAnswer);

module.exports=router
