import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signin from "./pages/SignIn";
import Home from "./pages/Home";
import AuthComponent from "./components/AuthComponent";
import Create from "./pages/Create";
import Quiz from "./pages/Quiz";

function App() {
  return (
    
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route element = {<AuthComponent/>}>
        <Route path="/create" element={<Create />} />
        <Route path="/" element={<Home />} />
        <Route path="quizzes/:id" element={<Quiz />} />
      </Route>
    </Routes>
  );
}

export default App;
