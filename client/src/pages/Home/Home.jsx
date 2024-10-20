import React, { useContext, useEffect, useState } from "react";
import classes from "./home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward, IoMdContact } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { AppState } from "../../Context/DataContext";
import axios from "../../Api/axios";
import Loader from "../../Components/Loader/Loader";
// Assigne to Abel and Bekalu.

function Home() {
  const { user, setUser } = useContext(AppState);
  const token = localStorage.getItem("token");
  const [questions, setquestions] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const navigate = useNavigate();
  async function Loadquestions() {
    try {
      const { data } = await axios.get("/question", {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      console.log(data?.questions);
      setIsLoading(false);
      setquestions(() => data.questions);
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data.msg);
      navigate("/login");
    }
  }
  async function checkuser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      console.log(data);
      setUser(data.username);
      navigate("/");
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }
  useEffect(() => {
    setIsLoading(true);
    checkuser();
    Loadquestions();
  }, []);
  useEffect(() => {
    const filtered = questions.filter((question) =>
      question.title.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredQuestions(filtered);
  }, [searchItem, questions]);
  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        <section className={classes.home__container}>
          <div className={classes.home__topcontainer}>
            <div>
              <Link to="/question">Ask Question</Link>
            </div>
            <div style={{ fontSize: "20px", fontWeight: "300" }}>
              <p>
                WELCOME:<span style={{ color: " #DA7229" }}>{user}</span>
              </p>
            </div>
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "300",
              marginBottom: "20px",
            }}
          >
            Questions
            <div className={classes.search}>
              <input
                type="text"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                placeholder="Search questions..."
              />
            </div>
          </div>
          <div>
            {filteredQuestions?.map((question, i) => {
              return (
                <div className={classes.question__outercontainer} key={i}>
                  <hr />
                  <div className={classes.home__questioncontainer}>
                    <div className={classes.home__iconandusernamecontainer}>
                      <div>
                        <div>
                          <IoMdContact size={80} />
                        </div>
                        <div className={classes.home__questionusename}>
                          {" "}
                          <p>{question?.user_name}</p>
                        </div>
                      </div>
                      <div className={classes.home__questiontitle}>
                        <p>{question?.title}</p>
                      </div>
                    </div>
                    <div style={{ marginTop: "30px" }}>
                      {" "}
                      <Link to={`/home/answers/${question.question_id}`}>
                        {" "}
                        <IoIosArrowForward size={30} color="black">
                          {" "}
                        </IoIosArrowForward>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}

export default Home;
