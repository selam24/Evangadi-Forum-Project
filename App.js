const mysql2 = require("mysql2");
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const answerRoutes = require("./routes/answerRoute");
const authMiddleware = require("./middleware/authMiddleware");
const app = express();

const PORT = 4000;


app.use(bodyparser.json()); //body json format
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//db connection credentials
const dbConnection = require("./db/dbconfig.js");

//   //testing the backend
app.get("/", (req, res) => {
  res.send("welcome");
});
  
// creating tables middlewear install
const installRoutes = require("./routes/installRoute");
app.use("/", installRoutes);

//user route middlewear
const userRoutes = require("./routes/userRoute");
app.use("/api/users", userRoutes);

//question route middlewear
const questionRoutes = require("./routes/questionRoute");
app.use("/api",authMiddleware ,questionRoutes);

//Answer route middlewear

app.use("/api",authMiddleware,answerRoutes);

// app.listen(port, () => console.log(`Listening to :${port}`));

// try conncet to database and if so app listen
async function start() {
  try {
    await dbConnection.execute("SELECT 1");
    console.log("database connection established");
    app.listen(PORT, () => {
      console.log(`Listening to :${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}
start();


