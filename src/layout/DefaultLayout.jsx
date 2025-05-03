// importo outlet da react-router-dom per mostrare le pagine figlie
import { Outlet } from "react-router-dom";
// importo l'header e il footer come componenti riutilizzabili
import Header from "../components/Header";
import Footer from "../components/Footer";

const DefaultLayout = () => {
    return (
        <>
            {/* inserisco l'header fisso in alto */}
            <Header />

            {/* outlet mostra la pagina corrente in base alla route */}
            <main>
                <Outlet />
            </main>

            {/* inserisco il footer fisso in basso */}
            <Footer />
        </>
    );
};

export default DefaultLayout;
