// importo useState per gestire l'apertura del menu
import { useState } from "react";
// importo il componente sidebar
import Sidebar from "./Sidebar";

function Header() {
    // creo uno stato per controllare se la sidebar è aperta o chiusa
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* header principale con il titolo dell'app e il pulsante menu */}
            <header className="header">
                <div className="container">
                    <h1 className="logo">🍷 Wine Comparator</h1>
                    {/* al click apro la sidebar */}
                    <button className="menu-button" onClick={() => setIsOpen(true)}>
                        ☰ Menu
                    </button>
                </div>
            </header>

            {/* sidebar che si apre se isOpen è true, e si chiude quando chiamo onClose */}
            <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}

export default Header;

