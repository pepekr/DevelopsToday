import express from "express";
import cookieParser from "cookie-parser";
import tokenCheck from "MIddleware/TokenCheck.js";
import {
  CreateFullQuiz as createFullQuiz,
  deleteQuiz,
  getAllQuizes,
  getFullQuiz,
} from "Controllers/QuizController.js";
const app = express();
const PORT = process.env.PORT || 3001;

// 1. `POST /quizzes` – Create a new quiz
// 2. `GET /quizzes` – Return a list of all quizzes with titles and number of questions
// 3. `GET /quizzes/:id` – Return full details of a quiz including all questions
// 4. `DELETE /quizzes/:id` – Delete a quiz

app.use(cookieParser());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello, world!");
});
app.post("/quizzes", tokenCheck, async (req, res) => {
  await createFullQuiz(req, res);
});
app.get("/quizzes", tokenCheck, async (req, res) => {
  await getAllQuizes(req, res);
});
app.get("/quizzes/:id", tokenCheck, async (req, res) => {
  await getFullQuiz(req, res);
});

app.delete("quizzess/:id", tokenCheck, async (req, res) => {
  await deleteQuiz(req, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
