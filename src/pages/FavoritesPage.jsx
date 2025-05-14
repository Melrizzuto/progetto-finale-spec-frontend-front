// importo il context dei preferiti per accedere alla lista dei vini salvati
import { useFavorites } from "../contexts/FavoritesContext";

// importo il componente winecard per visualizzare ogni vino preferito
import WineCard from "../components/WineCard";

export default function Favorites() {
    // prendo la lista dei preferiti dal context
    const { favorites } = useFavorites();

    // se la lista è vuota, mostro un messaggio all'utente
    if (favorites.length === 0) {
        return (
            <div className="favorites-container">
                <h2>i tuoi preferiti ❤️</h2>
                <p>nessun preferito selezionato.</p>
            </div>
        );
    }

    // altrimenti mostro la lista dei preferiti 
    return (
        <div className="favorites-container">
            <h2>i tuoi preferiti ❤️</h2>
            <div className="favorites-grid">
                {favorites.map((wine) => (
                    // per ogni vino preferito, mostro una winecard
                    <WineCard key={wine.id} wine={wine} />
                ))}
            </div>
        </div>
    );
}
