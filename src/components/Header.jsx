import { useState } from "react";
import Sidebar from "./Sidebar";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="header">
                <div className="container">
                    <h1 className="logo">🍷 Wine Comparator</h1>
                    <button onClick={() => setIsOpen(true)}>☰ Menu</button>
                </div>
            </header>

            <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}

export default Header;
