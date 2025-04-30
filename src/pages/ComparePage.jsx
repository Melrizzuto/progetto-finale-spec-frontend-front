import { useComparator } from "../contexts/ComparatorContext";


export default function ComparePage() {
    const { items } = useComparator();


    if (items.length < 2) return <p className="container">Seleziona 2 vini da confrontare.</p>;
    console.log("Vini selezionati:", items);

    return (
        <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
            {items.map((wine) => (
                <div key={wine.id} style={{ border: "1px solid #ccc", padding: "1rem", width: "50%" }}>
                    <h2>{wine.title}</h2>
                    <p><strong>Categoria:</strong> {wine.category}</p>
                    <p><strong>Winery:</strong> {wine.winery}</p>
                    <p><strong>Regione:</strong> {wine.region}</p>
                    <p><strong>Anno:</strong> {wine.year}</p>
                    <p><strong>Uva:</strong> {wine.grape}</p>
                    <p><strong>Gradazione:</strong> {wine.alcoholContent}%</p>
                    <p><strong>Descrizione:</strong> {wine.description}</p>

                </div>
            ))}
        </div>
    );
}
