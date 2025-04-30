import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = useCallback((wine) => {
        setFavorites((prev) => {
            const alreadyFavorite = prev.some((w) => w.id === wine.id);
            return alreadyFavorite
                ? prev.filter((w) => w.id !== wine.id)
                : [...prev, wine];
        });
    }, []);

    // ✅ Questo è il contextValue che React memoizza
    const contextValue = useMemo(() => ({
        favorites,
        toggleFavorite
    }), [favorites, toggleFavorite]);

    return (
        <FavoritesContext.Provider value={contextValue}>
            {children}
        </FavoritesContext.Provider>
    );
}

export const useFavorites = () => useContext(FavoritesContext);
