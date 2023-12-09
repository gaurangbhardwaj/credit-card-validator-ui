import React from "react";
import { ToastContainer } from "react-toastify";
import CreditCard from "./components/credit-card";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <CreditCard />
    </>
  );
}

export default App;
