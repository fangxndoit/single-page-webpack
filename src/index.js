import React from "react";
import ReactDOM from "react-dom";
import "jquery-goup";

import "./css/reset.css";
import "./css/animate.css";
import "./index.scss";
import App from "./js/App";
import { BrowserRouter, HashRouter, useNavigate } from "react-router-dom";


let menuBar = document.getElementsByClassName("page-header");
// 滚动监听对导航条进行颜色更改
window.addEventListener("scroll", function () {
  let scrollY = document.documentElement.scrollTop;
  menuBar[0].style.backgroundColor =
    scrollY > 70 ? "rgba(8,10,72,1)" : "rgba(8,10,72,0)";
});
//添加icon

//监听页面刷新

//引入goup
jQuery(document).ready(function () {
  jQuery.goup();
});

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("domId")
);
