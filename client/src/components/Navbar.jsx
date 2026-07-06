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
    <nav
      className="navbar navbar-expand-lg shadow sticky-top"
      style={{
        background: "linear-gradient(90deg,#2563eb,#1d4ed8)",
      }}
    >
      <div className="container-fluid px-4">

        {/* Logo + Title */}

        <div
          className="d-flex align-items-center"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <div
            className="bg-white rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{
              width: "45px",
              height: "45px",
              fontSize: "24px",
            }}
          >
            👨‍💼
          </div>

          <div>
            <h3 className="text-white fw-bold mb-0">
              Employee Management
            </h3>

            <small className="text-light">
              Admin Portal
            </small>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">

          {/* Profile */}

          <div className="dropdown">

            <button
              className="btn btn-light dropdown-toggle d-flex align-items-center shadow-sm"
              data-bs-toggle="dropdown"
            >
              {user?.photo ? (
                <img
                  src={`http://localhost:5000/uploads/${user.photo}`}
                  alt=""
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: 8,
                  }}
                />
              ) : (
                <div
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                  style={{
                    width: 38,
                    height: 38,
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}

              <span className="fw-semibold">
                {user?.name}
              </span>
            </button>

            <ul className="dropdown-menu dropdown-menu-end shadow">

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
            className="btn btn-light shadow-sm"
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