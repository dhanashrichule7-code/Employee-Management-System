function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">

        <h3 className="text-white mb-0">
          Employee Management System
        </h3>

        <button
          className="btn btn-light"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;