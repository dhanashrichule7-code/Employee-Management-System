import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyProfile from "./pages/MyProfile";
import ChangePassword from "./pages/ChangePassword";
import EditProfile from "./pages/EditProfile";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const token = localStorage.getItem("token");

  return (
    <div
      className={darkMode ? "bg-dark text-white" : ""}
      style={{
        minHeight: "100vh",
      }}
    >
      {token && (
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Home darkMode={darkMode} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={
            token ? (
              <Navigate to="/" replace />
            ) : (
              <Register />
            )
          }
        />

        <Route
          path="/profile"
          element={
            token ? (
              <MyProfile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/change-password"
          element={
            token ? (
              <ChangePassword />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/edit-profile"
          element={
            token ? (
              <EditProfile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;