import { Link, Navigate, useNavigate } from "react-router-dom";
import { memo } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { useComparator } from "../contexts/ComparatorContext";


function WineCard({ wine }) {
    const { favorites, toggleFavorite } = useFavorites();
    const isFavorite = favorites.some((w) => w.id === wine.id);
    const navigate = useNavigate();

    const handleFavoriteClick = () => {
        toggleFavorite(wine);
        setTimeout(() => {
            navigate("/favorites");
        }, 100);
    };

    const { items, toggleCompare } = useComparator();
    const isCompared = items.some((w) => w.id === wine.id);


    return (
        <div style={{ border: "1px solid black", margin: "10px", padding: "10px", width: "200px" }}>
            <h3>{wine.title}</h3>
            <p>Categoria: {wine.category}</p>

            <Link to={`/wines/${wine.id}`}>
                <button>🔍 Dettagli</button>
            </Link>

            <button onClick={handleFavoriteClick}>
                {isFavorite ? "💔 Rimuovi" : "❤️ Preferito"}
            </button>

            <button onClick={() => toggleCompare(wine)}>
                {isCompared ? "❌ Rimuovi dal confronto" : "🆚 Confronta"}
            </button>
        </div>
    );
}

export default memo(WineCard);
