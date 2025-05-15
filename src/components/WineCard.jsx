// importo link e navigate da react-router-dom per la navigazione tra pagine
import { Link, useNavigate } from "react-router-dom";
// uso memo per evitare re-render inutili se le props non cambiano
import { memo } from "react";
// importo il context dei preferiti
import { useFavorites } from "../contexts/FavoritesContext";
// importo il context del comparatore
import { useComparator } from "../contexts/ComparatorContext";

//Avvolgo la funzione in REACT memo per non ri renderizzare il componente se le props non cambiano
const WineCard = memo(function WineCard({ wine }) {
    // prendo la lista dei preferiti e la funzione per aggiungere/rimuovere
    const { favorites, toggleFavorite } = useFavorites();
    // verifico se questo vino è tra i preferiti
    const isFavorite = favorites.some((w) => w.id === wine.id);

    // hook per la navigazione programmatica
    const navigate = useNavigate();

    // prendo la lista dei vini confrontati e la funzione toggle
    const { items, toggleCompare } = useComparator();
    // verifico se questo vino è già selezionato per il confronto
    const isCompared = items.some((w) => w.id === wine.id);

    return (
        <div className="wine-card">
            {/* titolo e categoria del vino */}
            <h3>{wine.title}</h3>
            <p>Categoria: {wine.category}</p>

            {/* bottone per andare alla pagina di dettaglio */}
            <Link to={`/wines/${wine.id}`}>
                <button style={{ width: "300px" }}>🔍 Dettagli</button>
            </Link>

            {/* bottone per aggiungere o rimuovere dai preferiti */}
            <button onClick={() => {
                toggleFavorite(wine);
                setTimeout(() => navigate("/favorites"), 100);
            }}>
                {isFavorite ? "💔 Rimuovi" : "❤️ Preferito"}
            </button>

            {/* bottone per aggiungere o rimuovere il vino dal comparatore */}
            <button onClick={() => toggleCompare(wine)}>
                {isCompared ? "❌ Rimuovi dal confronto" : "🆚 Confronta"}
            </button>
        </div>
    );
});

export default WineCard;
