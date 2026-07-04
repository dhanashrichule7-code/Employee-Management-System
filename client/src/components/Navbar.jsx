import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userUpdated", updateUser);

    return () => {
      window.removeEventListener("userUpdated", updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">

        <h3
          className="text-white mb-0"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Employee Management System
        </h3>

        <div className="d-flex align-items-center gap-3">

          {/* Profile Dropdown */}

          <div className="dropdown">

            <button
              className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
              type="button"
              data-bs-toggle="dropdown"
            >

              {user?.photo ? (

                <img
                  src={`http://localhost:5000/uploads/${user.photo}`}
                  alt="Profile"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid white",
                    marginRight: "8px",
                  }}
                />

              ) : (

                <span
                  className="bg-light text-primary rounded-circle d-flex align-items-center justify-content-center me-2"
                  style={{
                    width: "34px",
                    height: "34px",
                    fontWeight: "bold",
                  }}
                >
                  {user?.name?.[0]?.toUpperCase()}
                </span>

              )}

              <span>{user?.name}</span>

            </button>

            <ul className="dropdown-menu dropdown-menu-end">

              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/")}
                >
                  🏠 Home
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/profile")}
                >
                  👤 My Profile
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/edit-profile")}
                >
                  ✏ Edit Profile
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/change-password")}
                >
                  🔒 Change Password
                </button>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </li>

            </ul>

          </div>

          {/* Dark Mode */}

          <button
            className="btn btn-light"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;