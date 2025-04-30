// src/components/Sidebar.jsx
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Sidebar({ isOpen, onClose }) {
    const location = useLocation();

    useEffect(() => {
        onClose();
    }, [location.pathname]);

    if (!isOpen) return null;

    return createPortal(
        <aside style={styles.backdrop} onClick={onClose}>
            <nav style={styles.sidebar} onClick={(e) => e.stopPropagation()}>
                <h2 style={{ marginBottom: "1rem" }}>🍷 Menu</h2>
                <Link to="/" style={styles.link}>🏠 Home</Link>
                <Link to="/compare" style={styles.link}>🆚 Compara</Link>
                <Link to="/favorites" style={styles.link}>❤️ Preferiti</Link>
                <button onClick={onClose} style={{ marginTop: "2rem" }}>Chiudi</button>
            </nav>
        </aside>,
        document.getElementById("portal-root")
    );
}


const styles = {
    backdrop: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "stretch",
        zIndex: 1000,
    },
    sidebar: {
        width: "250px",
        backgroundColor: "white",
        padding: "2rem",
        boxShadow: "2px 0 5px rgba(0,0,0,0.3)",
    },
    link: {
        display: "block",
        marginBottom: "1rem",
        textDecoration: "none",
        fontSize: "1.1rem",
        color: "black",
    },
};
