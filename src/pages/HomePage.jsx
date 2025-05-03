// importo il componente che mostra la lista dei vini
import WineList from "../components/WineList";

export default function HomePage() {
    return (
        <>
            {/* uso un contenitore per centrare e stilizzare la pagina */}
            <div className="container">
                {/* mostro la lista completa dei vini */}
                <WineList />
            </div>
        </>
    );
}
