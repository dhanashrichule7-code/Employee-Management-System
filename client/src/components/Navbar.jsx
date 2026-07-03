import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  
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
              className="btn btn-outline-light dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <span
  className="bg-light text-primary rounded-circle d-inline-flex align-items-center justify-content-center me-2"
  style={{ width: "30px", height: "30px", fontWeight: "bold" }}
>
 {user?.name?.[0]?.toUpperCase()}
</span>

{user?.name}
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
             
             <button
                 className="dropdown-item"
                 onClick={() => navigate("/edit-profile")}
              >
                 ✏ Edit Profile
            </button>


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