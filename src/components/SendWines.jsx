// src/components/SendWines.jsx
import React from "react";
import axios from "axios";
import wines from "../data/wine.json";

// importa tutte le immagini per assegnare l'URL frontend (opzionale)
const images = import.meta.glob('../assets/wines/*', { eager: true, as: 'url' });

export default function SendWines() {
    const handleSend = async () => {
        try {
            const enriched = wines.map(wine => ({
                ...wine,
                image: wine.image // se vuoi inviare solo il nome file
                // oppure: image: images[`../assets/wines/${wine.image}`] // se vuoi inviare il path completo
            }));

            await Promise.all(
                enriched.map(wine =>
                    axios.post("http://localhost:3001/wines", wine)
                )
            );

            alert("Tutti i vini sono stati inviati correttamente!");
        } catch (error) {
            console.error("Errore durante l'invio:", error);
            alert("Errore durante l'invio dei vini.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <button onClick={handleSend}>📤 Invia i 15 vini al backend</button>
        </div>
    );
}
