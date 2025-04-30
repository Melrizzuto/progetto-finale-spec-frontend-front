import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import WineCard from "./WineCard"

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
    const [wines, setWines] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("az");

    const fetchWines = useCallback(async () => {
        try {
            let url = "http://localhost:3001/wines";

            const params = [];
            if (search) params.push(`search=${search}`);
            if (category) params.push(`category=${category}`);
            if (params.length) {
                url += "?" + params.join("&");
            }

            const response = await axios.get(url);
            setWines(response.data);
        } catch (error) {
            console.error("Errore caricamento vini:", error);
        }
    }, [search, category]);

    const debouncedSetSearch = useCallback(
        debounce((value) => {
            setSearch(value);
        }, 300),
        []
    );

    const handleSearchChange = useCallback((e) => {
        setSearchInput(e.target.value);
        debouncedSetSearch(e.target.value);
    }, [debouncedSetSearch]);

    const handleCategoryChange = useCallback((e) => {
        setCategory(e.target.value);
    }, []);

    const handleSortChange = useCallback((e) => {
        setSortOrder(e.target.value);
    }, []);

    useEffect(() => {
        fetchWines();
    }, [fetchWines]);

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
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Cerca per titolo..."
                    value={searchInput}
                    onChange={handleSearchChange}
                />
                <select value={category} onChange={handleCategoryChange}>
                    <option value="">Tutte le categorie</option>
                    <option value="Rosso">Rosso</option>
                    <option value="Bianco">Bianco</option>
                    <option value="Rosé">Rosé</option>
                </select>
                <select value={sortOrder} onChange={handleSortChange}>
                    <option value="az">Ordina A-Z</option>
                    <option value="za">Ordina Z-A</option>
                </select>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {sortedWines.map((wine) => (
                    <WineCard key={wine.title} wine={wine} />
                ))}
            </div>
        </div>
    );
}
