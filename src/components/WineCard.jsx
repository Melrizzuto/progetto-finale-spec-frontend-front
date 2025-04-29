import { memo } from "react";

function WineCard({ wine }) {
    return (
        <div style={{ border: "1px solid black", margin: "10px", padding: "10px", width: "200px" }}>
            <h3>{wine.title}</h3>
            <p>Categoria: {wine.category}</p>
        </div>
    );
}

export default memo(WineCard);
