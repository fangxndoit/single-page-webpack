"use strict";
import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import Header from "../components/Header";
import Home from "../view/Home";

const { useState, useEffect, useRef } = React;

const App = function (props) {
  return (
    <>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
