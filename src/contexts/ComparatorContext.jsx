import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ComparatorContext = createContext();



export function ComparatorProvider({ children }) {
    const [items, setItems] = useState([]);
    const [hasNavigated, setHasNavigated] = useState(false);

    const navigate = useNavigate();

    const toggleCompare = useCallback(async (wine) => {
        const alreadySelected = items.some((w) => w.id === wine.id);

        if (alreadySelected) {
            setItems((prev) => prev.filter((w) => w.id !== wine.id));
            setHasNavigated(false); // resetti se rimuovi un vino
        } else if (items.length < 2) {
            try {
                const res = await axios.get(`http://localhost:3001/wines/${wine.id}`);
                const fullWine = res.data.wine;
                setItems((prev) => {
                    const updated = [...prev, fullWine];

                    if (updated.length === 2 && !hasNavigated) {
                        navigate("/compare");
                        setHasNavigated(true);
                    }

                    return updated;
                });
            } catch (error) {
                console.error("Errore nel caricamento dettagli vino", error);
            }
        }
    }, [items, navigate]);


    const contextValue = useMemo(() => ({
        items,
        toggleCompare
    }), [items, toggleCompare]);

    return (
        <ComparatorContext.Provider value={contextValue}>
            {children}
        </ComparatorContext.Provider>
    );
}

export const useComparator = () => useContext(ComparatorContext);
