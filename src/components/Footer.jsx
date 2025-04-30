const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>© {new Date().getFullYear()} Wine Comparator. Tutti i diritti riservati.</p>
                <p>
                    Made with 🍇 by <a href="https://tuosito.it">Mel Rizzuto </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;