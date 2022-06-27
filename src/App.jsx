import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";

import ListView from "./components/ListView";
import DetailView from "./components/DetailView";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ListView />} />
        <Route path="/:companyId/" element={<DetailView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
