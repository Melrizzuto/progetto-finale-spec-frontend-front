// Importo debounce da lodash per ottimizzare le chiamate di ricerca
import debounce from "lodash/debounce";
// Importo gli hook di React
import { useEffect, useState, useMemo } from "react";
// Importo axios per fare chiamate API
import axios from "axios";
// Importo il componente WineCard per la visualizzazione di ogni vino
import WineCard from "./WineCard";

export default function WineList() {
    // **Stati Locali**
    // Stato che memorizza i vini recuperati dal backend
    const [wines, setWines] = useState([]);
    // Stato per gestire l'input di ricerca digitato dall'utente
    const [searchInput, setSearchInput] = useState("");
    // Stato che contiene la stringa di ricerca effettiva con debounce
    const [search, setSearch] = useState("");
    // Stato per gestire il filtro della categoria selezionata
    const [category, setCategory] = useState("");
    // Stato per gestire l'ordine di ordinamento (a-z o z-a)
    const [sortOrder, setSortOrder] = useState("az");

    // **Debounce con Lodash**
    // Memorizzo la funzione di debounce che ritarda l'aggiornamento dello stato `search` di 300ms
    // Questo evita di fare troppe chiamate API mentre l'utente sta digitando
    const debouncedSetSearch = useMemo(() => debounce(setSearch, 300), []);

    // **Gestione dell'input di ricerca**
    // Quando l'utente digita nel campo di ricerca, aggiorno lo stato locale e avvio il debounce
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value); // aggiorno l'input di ricerca visibile
        debouncedSetSearch(e.target.value); // avvio il debounce
    };

    // **Gestione del filtro di categoria**
    // Quando l'utente seleziona una categoria dal menu a tendina
    const handleCategoryChange = (e) => {
        setCategory(e.target.value); // aggiorno lo stato della categoria selezionata
    };

    // **Gestione dell'ordinamento**
    // Quando l'utente cambia l'ordinamento (A-Z o Z-A)
    const handleSortChange = (e) => {
        setSortOrder(e.target.value); // aggiorno l'ordinamento selezionato
    };

    // **Chiamata API per recuperare i vini dal backend**
    // Ogni volta che cambia `search` o `category`, viene eseguita la richiesta API
    useEffect(() => {
        // Funzione asincrona per fare la richiesta al backend
        const fetchWines = async () => {
            try {
                // URL base dell'API
                let url = "http://localhost:3001/wines";
                const params = [];

                // Se esiste un termine di ricerca, lo aggiungo come parametro di query
                if (search) params.push(`search=${search}`);
                // Se esiste una categoria selezionata, la aggiungo come parametro di query
                if (category) params.push(`category=${category}`);
                // Se ci sono parametri, li concateno all'URL
                if (params.length) {
                    url += "?" + params.join("&");
                }

                // Faccio la richiesta HTTP con Axios
                const response = await axios.get(url);
                // Aggiorno lo stato dei vini con i dati ricevuti
                setWines(response.data);
            } catch (error) {
                console.error("Errore nel caricamento dei vini:", error);
            }
        };

        // Avvio della fetch
        fetchWines();
    }, [search, category]); // La fetch viene eseguita ogni volta che `search` o `category` cambiano

    // **Ordinamento dei vini**
    // Uso `useMemo` per memorizzare la lista ordinata e ricalcolarla solo se cambia `wines` o `sortOrder`
    const sortedWines = useMemo(() => {
        return [...wines].sort((a, b) => {
            // Confronto i titoli in ordine alfabetico
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            // Se l'ordine è "az" ordino dalla A alla Z, altrimenti dalla Z alla A
            return sortOrder === "az" ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
        });
    }, [wines, sortOrder]);

    //  **Render del componente**
    return (
        <div>
            {/* Barra di ricerca e selezione dei filtri */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="cerca per titolo..."
                    value={searchInput}
                    onChange={handleSearchChange}
                />
                <select value={category} onChange={handleCategoryChange}>
                    <option value="">tutte le categorie</option>
                    <option value="Rosso">rosso</option>
                    <option value="Bianco">bianco</option>
                    <option value="Rosé">rosé</option>
                </select>
                <select value={sortOrder} onChange={handleSortChange}>
                    <option value="az">ordina a-z</option>
                    <option value="za">ordina z-a</option>
                </select>
            </div>

            {/* Visualizzazione delle WineCard */}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {sortedWines.map((wine) => (
                    <WineCard key={wine.title} wine={wine} />
                ))}
            </div>
        </div>
    );
}
