import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailPage() {
    const { id } = useParams();
    const [wine, setWine] = useState(null);

    useEffect(() => {
        const fetchWine = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/wines/${id}`);
                console.log("Risposta API:", response.data);
                setWine(response.data.wine);
            } catch (error) {
                console.error("Errore nel caricamento del vino", error);
            }
        };

        fetchWine();
    }, [id]);


    if (!wine) return <p>Caricamento in corso...</p>;
    console.log("Wine:", wine);
    return (
        <div className="detail-container">
            <div className="detail-content">
                <img src={wine.image} alt={wine.title} className="wine-img" />
                <div className="wine-details">
                    <h2>{wine.title}</h2>
                    <p><strong>Categoria:</strong> {wine.category}</p>
                    <p><strong>Winery:</strong> {wine.winery}</p>
                    <p><strong>Regione:</strong> {wine.region}</p>
                    <p><strong>Anno:</strong> {wine.year}</p>
                    <p><strong>Uva:</strong> {wine.grape}</p>
                    <p><strong>Gradazione alcolica:</strong> {wine.alcoholContent}%</p>
                    <p><strong>Descrizione:</strong> {wine.description}</p>
                </div>
            </div>
        </div>
    );

}
