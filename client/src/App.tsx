import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signin from './pages/SignIn';


function App() {
  return (
   <Routes>
    <Route element={<Login/>}/>
    <Route element={<Signin/>}/>
   </Routes>
  );
}

export default App;
