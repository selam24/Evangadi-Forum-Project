import React, { useState, useEffect } from "react";
import classes from "../Answer/answer.module.css";
import { IoIosContact, IoMdContact } from "react-icons/io";
import instance from "../../Api/axios";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { Link } from "react-router-dom";
import { FaCircleArrowRight } from "react-icons/fa6";

function Answer() {
  // Extract question ID from URL parameters
  const { questionId } = useParams();
  // State variables to manage data and UI
  const [answer, setAnswer] = useState(""); // User's answer input
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [username, setUsername] = useState(""); // Username state (not currently used)
  const [question, setQuestion] = useState({ title: "", description: "" }); // Question data
  const [answers, setAnswers] = useState([]); // List of answers
  const [isloading, setIsLoading] = useState(false); // Loading state
  const token = localStorage.getItem("token"); // Fetch token from local storage

  useEffect(() => {
    // Function to fetch question details from API
    const fetchQuestion = async () => {
      try {
        const response = await instance.get(`/question/${questionId}`, {
          headers: {
            authorization: "Bearer " + token, // Include token in request headers
          },
        });
        setIsLoading(false);
        // Set question data from API response
        setQuestion({
          title: response.data.question.title,
          description: response.data.question.description,
        });
        // used to update the state of a component.  Set to the title of a question retrieved from an API response.  Set to the description of the question
      } catch (error) {
        setIsLoading(false);
        // Handle error during fetch
        setErrorMessage("Failed to load question.");
      }
    };

    // Function to fetch answers for the question
    const fetchAnswers = async () => {
      try {
        const response = await instance.get(`/${questionId}`, {
          headers: {
            authorization: "Bearer " + token, // Include token in request headers
          },
        });
        // Set answers data from API response
        setAnswers(response.data.answer);
      } catch (error) {
        // Handle error during fetch
        setErrorMessage("Failed to load answers.");
      }
    };

    // Call functions to fetch question and answers
    fetchQuestion();
    fetchAnswers();
  }, [answer]); // Dependency on 'answer' may cause unnecessary re-fetching

  // Function to handle posting a new answer
  const postAnswer = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    setIsLoading(true); // Sets loading state to true while processing
    // Check if answer is provided
    if (!answer) {
      setErrorMessage("Please provide an answer.");
      return;
    }

    try {
      const response = await instance.post(
        `/answer/${questionId}`,
        { answer },
        {
          headers: {
            authorization: "Bearer " + token, // Include token in request headers
          },
        }
      );
      if (response.status === 201) {
        // Success: reset input and show success message
        setSuccessMessage("Answer posted successfully");
        setAnswer("");
      } else if (response.status === 400) {
        // Handle bad request
        setErrorMessage("Please provide an answer.");
      } else {
        // Handle unexpected errors
        setErrorMessage("An unexpected error occurred.");
      }
    } catch (error) {
      // Handle error during post
      setErrorMessage("Something went wrong. Try again later.");
    }
  };

  return (
    <>
      {isloading ? ( // Display loader if loading
        <Loader />
      ) : (
        <main>
          <div className={classes.title}>
            <h1>Question</h1>
            <div className={classes.question_box}>
              <span>
                <FaCircleArrowRight // Icon for question arrow
                  style={{ fontSize: "20px", margin: "35px", color: "blue" }}
                />
              </span>

              <div className={classes.real_question}>
                <span>
                  <h4>{question.title || "Title Of A Question"}</h4>
                  <hr />
                </span>
                <p>{question.description || "Description"}</p>
              </div>
            </div>
          </div>

          <section className={classes.answer_section}>
            <h2>Answer From The Community</h2>
            <hr />
            {answers.length > 0 ? ( // Check if there are answers
              answers.map((answer, index) => (
                // This iterates(process of going through each element in a collection) over each answer in the answers array, allowing you to render each answer in the UI.
                <div className={classes.answer} key={index}>
                  <div>
                    <IoMdContact size={80} />
                    <h4 className={classes.username}>{answer.user_name}</h4>
                  </div>

                  <div className={classes.margin}>
                    <p>{answer.answer}</p> {/* Display each answer */}
                  </div>
                </div>
              ))
            ) : (
              <p>No answers yet. Be the first to answer!😇</p> // No answers message
            )}
            {/* Displaying the fetched username (currently unused) */}
            <p className={classes.username}>{username}</p>
          </section>

          <section className={classes.answer_form}>
            <h2>Answer The Top Question</h2>
            {/* Display error or success messages */}
            {errorMessage && <p className={classes.error}>{errorMessage}</p>}
            {successMessage && (
              <p className={classes.success}>{successMessage}</p>
            )}
            <div className={classes.link}>
              <Link to="/question">Go To Question Page</Link>{" "}
              {/* Link to question page */}
            </div>
            <textarea
              placeholder="Your Answer..."
              value={answer} // Controlled input for answer
              onChange={(e) => setAnswer(e.target.value)} // Update state on change
              required
            />
            <button
              type="submit"
              className={classes.submit_btn}
              onClick={postAnswer} // Handle answer submission
            >
              Post Your Answer
            </button>
          </section>
        </main>
      )}
    </>
  );
}

export default Answer;
