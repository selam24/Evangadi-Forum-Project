const {
  StatusCodes,
  BAD_REQUEST,
  NOT_FOUND,
  OK,
} = require("http-status-codes");
const dbConnection = require("../db/dbconfig");
const { json, query } = require("express");

async function postAnswer(req, res) {
  //Assignee: Liyu
  const { answer } = req.body;
  const { questionid } = req.params;
  console.log(questionid);
  if (!questionid || !answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all requird information" });
  }
  try {
    const username = req.user.username; // from auth middlewear
    const userid = req.user.userid; // from auth middlewear
    await dbConnection.query(
      "insert into answers (questionid,userid,answer) values(?,?,?)",
      [questionid, userid, answer]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "answer added" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "someting went wrong,try again later" });
  }
}

async function getAnswer(req, res) {
  // req.params: Used to get data from the URL path of the request, typically in GET requests.
  const { questionid } = req.params;

  // Check if question_id is provided
  if (!questionid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a question ID." });
  }
  try {
    // First, check if the question exists
    const [questions] = await dbConnection.query(
      "SELECT questionid FROM questions WHERE questionid = ?",
      [questionid]
    );
    // If the question does not exist, return an error
    if (questions.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No question found with this ID." });
    }
    const userid = req.user.userid; // from auth middlewear
    // retrieve/get answers for a specific question
    const [answer] = await dbConnection.query(
      "SELECT answers.answerid, answers.answer, answers.userid, answers.created_at,users.username AS user_name FROM answers JOIN users ON answers.userid = users.userid WHERE questionid = ?",
      [questionid]
    );
    return res.status(StatusCodes.OK).json({ questionid, answer: answer });
  } catch (error) {
    // console.error("Error while submitting answer:", error.message);
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, please try again!" });
  }
}

module.exports = { postAnswer, getAnswer };
