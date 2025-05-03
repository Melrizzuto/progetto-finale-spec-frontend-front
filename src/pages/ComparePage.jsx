import { useComparator } from "../contexts/ComparatorContext";


export default function ComparePage() {
    const { items } = useComparator();


    if (items.length < 2) return <p className="container">Seleziona 2 vini da confrontare.</p>;
    console.log("Vini selezionati:", items);

    return (
        <div className="compare-container">
            {items.map((wine) => (
                <div key={wine.id} className="compare-card">
                    <img src={wine.image} alt={wine.title} className="compare-img" />
                    <div className="compare-details">
                        <h2>{wine.title}</h2>
                        <p><strong>Categoria:</strong> {wine.category}</p>
                        <p><strong>Winery:</strong> {wine.winery}</p>
                        <p><strong>Regione:</strong> {wine.region}</p>
                        <p><strong>Anno:</strong> {wine.year}</p>
                        <p><strong>Uva:</strong> {wine.grape}</p>
                        <p><strong>Gradazione:</strong> {wine.alcoholContent}%</p>
                        <p><strong>Descrizione:</strong> {wine.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );

}
