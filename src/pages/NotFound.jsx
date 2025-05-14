import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <p>Oooooops..<br />La pagina che stai cercando non esiste.</p>
        <Link to="/" className="not-found-link">🏠 Torna alla Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
