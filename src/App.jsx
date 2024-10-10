import { useState } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import RegistrationForm from "./components/Registration";
import Success from "./components/Success";

// import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
