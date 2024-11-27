import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Components/Login';
import DashBoard from './Components/DashBoard';
import Post from './Components/Post';
import Sidebar from './Components/Sidebar';
import Comments from './Components/Comments';
import ToDos from './Components/ToDos';
import SessionContext from './Components/SessionContext';
import React, { useState } from 'react';
import Header from "./Components/Header";


export const url = 'https://jsonplaceholder.typicode.com'

function App() {
  const [userContent, setUserContent] = useState("");

  return (
    <SessionContext.Provider value={{userContent, setUserContent}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/post" element={<Post />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/todos" element={<ToDos />} />

  
      </Routes>
    </BrowserRouter>
    </SessionContext.Provider>
  );
}

export default App;
