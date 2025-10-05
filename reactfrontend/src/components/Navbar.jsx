import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <h2 className="logo">📝 Task Manager</h2>
      <div className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>🏠 Dashboard</Link>
        <Link to="/search" className={location.pathname === "/search" ? "active" : ""}>🔍 Search Task</Link>
        <Link to="/board" className={location.pathname === "/board" ? "active" : ""}>📊 Task Board</Link>
        </div>
    </nav>
  );
}
