
//uso il Context globale per gestire la selezione di due vini da confrontare.
//Gestisco uno stato chiamato items che contiene i vini selezionati.
//Ogni volta che seleziono un vino:
//- Se è già selezionato > lo rimuovo dalla lista.
//- Se non è selezionato e ci sono meno di 2 vini > faccio una chiamata API per prendere i dettagli e lo aggiungo.
//Quando i vini selezionati diventano 2 > navigo automaticamente alla pagina / compare.
//Il flag hasNavigated evita di ripetere la navigazione fino a quando non viene deselezionato un vino.


// importo gli hook di react e react-router-dom
import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// importo axios per fare la richiesta del vino completo da confrontare
import axios from "axios";

// creo il context per il comparatore
const ComparatorContext = createContext();

export function ComparatorProvider({ children }) {
    // stato per i vini selezionati per il confronto
    const [items, setItems] = useState([]);
    // stato per evitare navigazioni ripetute verso la pagina di confronto
    const [hasNavigated, setHasNavigated] = useState(false);

    // hook per navigare verso la pagina di confronto
    const navigate = useNavigate();

    // funzione per aggiungere o rimuovere un vino dal confronto
    const toggleCompare = useCallback(async (wine) => {
        // verifico se il vino è già stato selezionato
        const alreadySelected = items.some((w) => w.id === wine.id);

        if (alreadySelected) {
            // se è già selezionato, lo rimuovo
            setItems((prev) => prev.filter((w) => w.id !== wine.id));
            setHasNavigated(false); // resetto la navigazione
        } else if (items.length < 2) {
            try {
                // prendo i dettagli completi del vino
                const res = await axios.get(`http://localhost:3001/wines/${wine.id}`);
                const fullWine = res.data.wine;

                setItems((prev) => {
                    const updated = [...prev, fullWine];

                    // se ora ci sono due vini e non ho ancora navigato, vado alla pagina compare
                    if (updated.length === 2 && !hasNavigated) {
                        navigate("/compare");
                        setHasNavigated(true);
                    }

                    return updated;
                });
            } catch (error) {
                console.error("errore nel caricamento dettagli vino", error);
            }
        }
    }, [items, navigate]);

    // preparo il valore da passare al context
    const contextValue = useMemo(() => ({
        items,
        toggleCompare
    }), [items, toggleCompare]);

    // ritorno il provider con i figli dentro
    return (
        <ComparatorContext.Provider value={contextValue}>
            {children}
        </ComparatorContext.Provider>
    );
}

// creo un hook personalizzato per usare il context
export const useComparator = () => useContext(ComparatorContext);
