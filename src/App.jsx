import React from "react";
import { BrowserRouter, Routes, Switch, Route, Link } from "react-router-dom";

import ListView from "./components/ListView";
import DetailView from "./components/DetailView";


import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ListView />}/>
        {/* <Route exact path="/" element={<EntryFrom />} /> */}

        <Route path="/:companyId/" element={<DetailView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
