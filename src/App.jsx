import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Map from "./pages/Map";
import About from "./pages/About";

const App = () => {
  // useEffect(() => {
  //   const setVh = () => {
  //     const vh = window.innerHeight * 0.01;
  //     document.documentElement.style.setProperty("--vh", `${vh}px`);
  //   };
  //   setVh();
  //   window.addEventListener("resize", setVh);

  //   return () => {
  //     window.removeEventListener("resize", setVh);
  //   };
  // }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/"
          element={<Map />}
        />
      </Routes>
    </Router>
  );
};

export default App;
