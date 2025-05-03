// importo useParams per leggere l'id dalla rotta
import { useParams } from "react-router-dom";
// importo useEffect e useState per gestire dati e caricamento
import { useEffect, useState } from "react";
// importo axios per fare la richiesta al backend
import axios from "axios";

export default function DetailPage() {
    // prendo l'id del vino dalla URL
    const { id } = useParams();
    // creo uno stato per salvare i dati del vino
    const [wine, setWine] = useState(null);

    // al caricamento della pagina (o se cambia id), faccio la richiesta API
    useEffect(() => {
        const fetchWine = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/wines/${id}`);
                console.log("risposta API:", response.data);
                // salvo il vino ottenuto nello stato
                setWine(response.data.wine);
            } catch (error) {
                console.error("errore nel caricamento del vino", error);
            }
        };

        fetchWine();
    }, [id]);

    // se il vino non è ancora stato caricato, mostro un messaggio
    if (!wine) return <p>caricamento in corso...</p>;

    // debug: stampo il vino in console
    console.log("wine:", wine);

    // quando il vino è pronto, lo mostro nella pagina di dettaglio
    return (
        <div className="detail-container">
            <div className="detail-content">
                <img src={wine.image} alt={wine.title} className="wine-img" />
                <div className="wine-details">
                    <h2>{wine.title}</h2>
                    <p><strong>categoria:</strong> {wine.category}</p>
                    <p><strong>winery:</strong> {wine.winery}</p>
                    <p><strong>regione:</strong> {wine.region}</p>
                    <p><strong>anno:</strong> {wine.year}</p>
                    <p><strong>uva:</strong> {wine.grape}</p>
                    <p><strong>gradazione alcolica:</strong> {wine.alcoholContent}%</p>
                    <p><strong>descrizione:</strong> {wine.description}</p>
                </div>
            </div>
        </div>
    );
}
