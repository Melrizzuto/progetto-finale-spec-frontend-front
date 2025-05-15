// src/components/Sidebar.jsx
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Sidebar({ isOpen, onClose }) {
    // prendo la posizione corrente per chiudere la sidebar quando cambio pagina
    const location = useLocation(); //Questo hook (useLocation) viene fornito da react-router-dom e restituisce l'oggetto location che contiene informazioni sull'URL corrente. Tra le informazioni disponibili c'è il pathname, che rappresenta l'indirizzo corrente(es. / home, /favorites, /compare).

    useEffect(() => {
        // chiudo la sidebar ogni volta che cambia il pathname
        onClose();
    }, [location.pathname]);

    // se la sidebar non è aperta, non renderizzo nulla
    if (!isOpen) return null;

    // creo il portale della sidebar che si sovrappone alla pagina
    return createPortal(
        <aside className="sidebar-backdrop" onClick={onClose}>
            {/* blocco la propagazione del click sulla sidebar per evitare che si chiuda cliccando dentro */}
            <nav className="sidebar" onClick={(e) => e.stopPropagation()}>
                <h2 style={{ marginBottom: "1rem" }}>🍷 Menu</h2>
                <Link to="/" className="sidebar-link">🏠 Home</Link>
                <Link to="/compare" className="sidebar-link">🆚 Compara</Link>
                <Link to="/favorites" className="sidebar-link">❤️ Preferiti</Link>
                <button onClick={onClose} style={{ marginTop: "2rem" }}>Chiudi</button>
            </nav>
        </aside>,
        document.getElementById("portal-root")
    );
}
