function Footer({ darkMode }) {
  return (
    <footer
      className={`mt-5 py-4 ${
        darkMode
          ? "bg-black text-light"
          : "bg-light text-dark"
      }`}
    >
      <div className="container text-center">

        <h5 className="fw-bold mb-2">
          Employee Management System
        </h5>

        <p className="mb-3">
          Built with React • Node.js • Express • MongoDB
        </p>

        <div className="d-flex justify-content-center gap-4 mb-3 flex-wrap">

          <a
            href="https://github.com/YOUR_GITHUB"
            target="_blank"
            rel="noreferrer"
            className={darkMode ? "text-light text-decoration-none" : "text-dark text-decoration-none"}
          >
            🐙 GitHub
          </a>

          <a
            href="https://linkedin.com/in/YOUR_LINKEDIN"
            target="_blank"
            rel="noreferrer"
            className={darkMode ? "text-light text-decoration-none" : "text-dark text-decoration-none"}
          >
            💼 LinkedIn
          </a>

          <a
            href="mailto:YOUR_EMAIL@gmail.com"
            className={darkMode ? "text-light text-decoration-none" : "text-dark text-decoration-none"}
          >
            📧 Contact
          </a>

        </div>

        <small className={darkMode ? "text-secondary" : "text-muted"}>
          © 2026 Employee Management System • Developed by{" "}
          <span className="fw-bold">
            Dhanashri Chule
          </span>
        </small>

      </div>
    </footer>
  );
}

export default Footer;