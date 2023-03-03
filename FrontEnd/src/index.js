import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CreatePost from "./createpost";
import ShowPost from "./showpost";

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <BrowserRouter>
        <h2 style={{ background: "#FF00FF", color: "white", textAlign: "center" ,width:"100%"}}>Post App</h2>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/createpost' element={<CreatePost />} />
            <Route path='/showpost' element={<ShowPost />} />
        </Routes>
    </BrowserRouter>
)