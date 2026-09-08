// components/Navbar.jsx
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/img/logo.png" alt="LaCOSE" />
        {/* <span>LaCOSE</span> */}
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/laboratoire">Laboratoire</Link></li>
        <li><Link to="/actualites">Actualités</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;