import React, { useRef, useState } from "react";
import classes from "./questions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import axios from "../../Api/axios";
import { ClipLoader } from "react-spinners";

const Question = () => {
  const [alertMessage, setAlertMessage] = useState(""); // Alert message state
  const [alertType, setAlertType] = useState("");
  const [isloading, setIsLoading] = useState(false); // To track success or error
  const token = localStorage.getItem("token");
  const titleDom = useRef(null);
  const detailDom = useRef(null);
  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    const title = titleDom.current.value;
    const description = detailDom.current.value;

    if (!title) {
      titleDom.current.style.borderColor = "#fe8302";
      setIsLoading(false);
      return;
    }
    if (!description) {
      detailDom.current.style.borderColor = "#fe8302";
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(
        "/question",
        { title, description },
        { headers: { Authorization: "Bearer " + token } }
      );
      setIsLoading(false);
      setAlertMessage("Your question was posted successfully!");
      setAlertType("success");
    } catch (error) {
      setIsLoading(false);
      console.log(error.response);
    }
    setTimeout(() => {
      setAlertMessage("");
      window.location.reload();
    }, 4000);
  }

  return (
    <>
      <section className={classes.post_question_container}>
        <div className={classes.inner_post_question_wrapper}>
          <div>
            <h2 className={classes.post_title}>
              Steps To Write A Good Question.
            </h2>
            <div className={classes.border_bottom}></div>
            <p>
              <FontAwesomeIcon
                icon={faCircleDown}
                rotation={270}
                style={{ marginRight: "10px" }}
              />
              Summarize your problems in a one-line-title.
            </p>

            <p>
              <FontAwesomeIcon
                icon={faCircleDown}
                rotation={270}
                style={{ marginRight: "10px" }}
              />
              Describe your problem in more detail.
            </p>
            <p>
              <FontAwesomeIcon
                icon={faCircleDown}
                rotation={270}
                style={{ marginRight: "10px" }}
              />
              Describe what you tried and what you expected to happen.
            </p>
            <p>
              <FontAwesomeIcon
                icon={faCircleDown}
                rotation={270}
                style={{ marginRight: "10px" }}
              />
              Review your question and post it here.
            </p>
          </div>
          <div>
            <h3 className={classes.post_title_2}>Post Your Question</h3>
          </div>
          {alertMessage && (
            <div
              className={classes.question_alert_message}
              style={{
                color: alertType === "success" ? "green" : "red",
              }}
            >
              {alertMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <input
              ref={titleDom}
              className={classes.post_input_title}
              type="text"
              placeholder="Question title"
            />
            <br />
            <textarea
              ref={detailDom}
              className={classes.post_textarea}
              rows="8"
              name=""
              id=""
              placeholder="Question detail ..."
            ></textarea>
            <br />

            <button className={classes.post_button}>
              {isloading ? <ClipLoader size={18} /> : "Post Question"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Question;
