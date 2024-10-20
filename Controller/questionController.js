const { json, query } = require("express");
const dbConnection = require("../db/dbconfig");
const {
  StatusCodes
} = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");
async function question(req, res) {
  const { title, description } = req.body;
  // Validate input
  const questionid = uuidv4();
  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required information" });
  }
  if (title.length > 200) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Title must be less than 200 characters" });
  }

  try {
    const username = req.user.username; // from auth middleware
    const userid = req.user.userid; // from auth middleware

    // Check for duplicate question ID
    const [existingQuestion] = await dbConnection.query(
      "SELECT * FROM questions WHERE questionid = ?",
      [questionid]
    );
    if (existingQuestion.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "Question ID already exists" });
    }

    // Insert new question
    await dbConnection.query(
      "INSERT INTO questions (questionid, userid, title, description) VALUES (?, ?, ?, ?)",
      [questionid, userid, title, description]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question added", questionid });
  } catch (error) {
    console.error("Error adding question:", error); // Log error with context
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
}
async function Allquestion(req, res) {
  try {
    const [results] = await dbConnection.query(
      `SELECT 
          questions.questionid AS question_id, 
          questions.title, 
          questions.description AS content, 
          users.username AS user_name 
      FROM questions 
      JOIN users ON questions.userid = users.userid 
      ORDER BY questions.id DESC`
    );
    return res.status(StatusCodes.OK).json({ questions: results });
  } catch (error) {
    // console.log(error.message);
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "No questions found" });
  }
}
async function getSingleQuestion(req, res) {
  const { question_id } = req.params;

  if (!question_id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a question ID." });
  }

  try {
    // Retrieve the question details
    const [question] = await dbConnection.query(
      "SELECT questionid, title, description, created_at, userid FROM questions WHERE questionid = ?",
      [question_id]
    );

    // If the question does not exist, return an error
    if (question.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No question found with this ID." });
    }

    return res.status(StatusCodes.OK).json({ question: question[0] });
  } catch (error) {
    console.error("Error while retrieving question:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again!" });
  }
}

module.exports = { question, Allquestion, getSingleQuestion };
