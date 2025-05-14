
//Context globale per gestire i vini salvati come preferiti.
//Gestisco uno stato chiamato favorites che contiene la lista dei preferiti.
//All'inizio, recupero i preferiti salvati nel localStorage.
//Ogni volta che aggiungo o rimuovo un vino dai preferiti:
//Controllo se è già presente.
//- Se sì, lo rimuovo; altrimenti lo aggiungo. (togglefavorites)
//Aggiorno anche il localStorage per salvare i cambiamenti.
//I componenti figli possono accedere direttamente alla lista dei preferiti e al metodo di toggle tramite l'hook personalizzato useFavorites.


// importo tutti gli hook necessari da react
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

// creo il context per i preferiti
const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    // inizializzo lo stato dei preferiti, prendendoli da localStorage se esistono
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    // ogni volta che cambia lo stato dei preferiti, lo salvo in localStorage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // funzione per aggiungere o rimuovere un vino dai preferiti
    const toggleFavorite = useCallback((wine) => {
        setFavorites((prev) => {
            const alreadyFavorite = prev.some((w) => w.id === wine.id);
            // se è già presente lo rimuovo, altrimenti lo aggiungo
            return alreadyFavorite
                ? prev.filter((w) => w.id !== wine.id)
                : [...prev, wine];
        });
    }, []);

    // preparo il valore da passare nel context, memorizzato con useMemo per performance
    const contextValue = useMemo(() => ({
        favorites,
        toggleFavorite
    }), [favorites, toggleFavorite]);

    // ritorno il provider con tutti i figli dentro
    return (
        <FavoritesContext.Provider value={contextValue}>
            {children}
        </FavoritesContext.Provider>
    );
}

// creo un hook personalizzato per usare il context più facilmente
export const useFavorites = () => useContext(FavoritesContext);
