// importo il context del comparatore per accedere ai vini selezionati
import { useComparator } from "../contexts/ComparatorContext";

export default function ComparePage() {
    // prendo i vini selezionati dal context
    const { items } = useComparator();

    // se ci sono meno di 2 vini selezionati, mostro un messaggio
    if (items.length < 2) return <p className="container">seleziona 2 vini da confrontare.</p>;

    // se ci sono 2 vini, li mostro affiancati con tutte le info
    return (
        <div className="compare-container">
            {items.map((wine) => (
                <div key={wine.id} className="compare-card">
                    <img src={wine.image} alt={wine.title} className="compare-img" />
                    <div className="compare-details">
                        <h2>{wine.title}</h2>
                        <p><strong>categoria:</strong> {wine.category}</p>
                        <p><strong>winery:</strong> {wine.winery}</p>
                        <p><strong>regione:</strong> {wine.region}</p>
                        <p><strong>anno:</strong> {wine.year}</p>
                        <p><strong>uva:</strong> {wine.grape}</p>
                        <p><strong>gradazione:</strong> {wine.alcoholContent}%</p>
                        <p><strong>descrizione:</strong> {wine.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
