import { Link, useNavigate } from "react-router-dom";
import { memo } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { useComparator } from "../contexts/ComparatorContext";


function WineCard({ wine }) {


    const { favorites, toggleFavorite } = useFavorites();
    const isFavorite = favorites.some((w) => w.id === wine.id);
    const navigate = useNavigate();

    const { items, toggleCompare } = useComparator();
    const isCompared = items.some((w) => w.id === wine.id);


    return (
        <div className="wine-card">
            <h3>{wine.title}</h3>
            <p>Categoria: {wine.category}</p>

            <Link to={`/wines/${wine.id}`}>
                <button style={{ width: "300px" }}>🔍 Dettagli</button>
            </Link>

            <button onClick={() => {
                toggleFavorite(wine);
                setTimeout(() => navigate("/favorites"), 100);
            }}>
                {isFavorite ? "💔 Rimuovi" : "❤️ Preferito"}
            </button>

            <button onClick={() => toggleCompare(wine)}>
                {isCompared ? "❌ Rimuovi dal confronto" : "🆚 Confronta"}
            </button>
        </div>
    );
}

export default memo(WineCard);
