import { useFavorites } from "../contexts/FavoritesContext";
import WineCard from "../components/WineCard";

export default function Favorites() {
    const { favorites } = useFavorites();

    if (favorites.length === 0) {
        return <p>Nessun preferito selezionato.</p>;
    }

    return (
        <div>
            <h2>I tuoi preferiti ❤️</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {favorites.map((wine) => (
                    <WineCard key={wine.id} wine={wine} />
                ))}
            </div>
        </div>
    );
}
