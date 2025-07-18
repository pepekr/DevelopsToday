import express from "express";
import cookieParser from "cookie-parser";
import tokenCheck from "MIddleware/TokenCheck.js";
import {
  CreateFullQuiz as createFullQuiz,
  deleteQuiz,
  getAllQuizes,
  getFullQuiz,
} from "Controllers/QuizController.js";
import { login, signin } from "Controllers/AuthController.js";
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
app.post("/login", async (req, res) => {
  await login(req, res);
});
app.post("/signin", async (req, res) => {
  await signin(req, res);
});
app.post("/logout", (req, res) => {
  res.clearCookie("access-token");
  res.clearCookie("refresh-token");
  res.status(200).send();
});

app.get("/verify", tokenCheck, (req, res) => {
  const { "access-token": accessToken, "refresh-token": refreshToken } =
    req.cookies || {};
  if (accessToken || refreshToken) {
    return res.sendStatus(200);
  }
  return res.sendStatus(401);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
