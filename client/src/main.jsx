import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import UserProvider from "./context/UserContext";

import App from "./App.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
  <UserProvider>
    <App />

    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="colored"
    />
  </UserProvider>
</BrowserRouter>
  </StrictMode>
);