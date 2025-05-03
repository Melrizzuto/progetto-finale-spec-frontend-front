// importo axios per fare chiamate API
import axios from "axios";
// importo gli hook necessari
import { useEffect, useState, useCallback, useMemo } from "react";
// importo il componente che mostra ogni vino
import WineCard from "./WineCard";

// creo una funzione debounce per ritardare l'esecuzione della ricerca
function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

export default function WineList() {
    // stato per i vini ottenuti dal backend
    const [wines, setWines] = useState([]);
    // stato per l'input di ricerca digitato
    const [searchInput, setSearchInput] = useState("");
    // stato che attiva la ricerca vera e propria (con debounce)
    const [search, setSearch] = useState("");
    // stato per la categoria selezionata
    const [category, setCategory] = useState("");
    // stato per l'ordine di ordinamento (a-z o z-a)
    const [sortOrder, setSortOrder] = useState("az");

    // funzione per recuperare i vini dal backend con i parametri di ricerca
    const fetchWines = useCallback(async () => {
        try {
            let url = "http://localhost:3001/wines";
            const params = [];

            // aggiungo i parametri se presenti
            if (search) params.push(`search=${search}`);
            if (category) params.push(`category=${category}`);
            if (params.length) {
                url += "?" + params.join("&");
            }

            // chiamo l'API e salvo i risultati
            const response = await axios.get(url);
            setWines(response.data);
            console.log("response.data:", response.data);
        } catch (error) {
            console.error("errore caricamento vini:", error);
        }
    }, [search, category]);

    // creo una funzione di ricerca con debounce per evitare troppe chiamate
    const debouncedSetSearch = useCallback(
        debounce((value) => {
            setSearch(value);
        }, 300),
        []
    );

    // aggiorno l'input e avvio il debounce
    const handleSearchChange = useCallback((e) => {
        setSearchInput(e.target.value);
        debouncedSetSearch(e.target.value);
    }, [debouncedSetSearch]);

    // aggiorno la categoria selezionata
    const handleCategoryChange = useCallback((e) => {
        setCategory(e.target.value);
    }, []);

    // aggiorno l'ordinamento selezionato
    const handleSortChange = useCallback((e) => {
        setSortOrder(e.target.value);
    }, []);

    // ogni volta che cambiano search o category, chiamo l'api
    useEffect(() => {
        fetchWines();
    }, [fetchWines]);

    // ordino i vini in base al titolo e all'ordine scelto
    const sortedWines = useMemo(() => {
        return [...wines].sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            if (sortOrder === "az") {
                return titleA.localeCompare(titleB);
            } else {
                return titleB.localeCompare(titleA);
            }
        });
    }, [wines, sortOrder]);

    return (
        <div>
            {/* barra di ricerca, filtro per categoria, ordinamento */}
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

            {/* visualizzo le winecard con i dati ordinati */}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {sortedWines.map((wine) => (
                    <WineCard key={wine.title} wine={wine} />
                ))}
            </div>
        </div>
    );
}
