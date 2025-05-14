export type Wine = {
    title: string;      // nome del vino
    image: string;      // immagine del vino
    category: string;   // tipo di vino: es. rosso, bianco, rosé
    winery: string;     // nome della cantina
    region: string;     // regione di produzione
    year: number;       // anno di produzione
    grape: string;      // tipo di uva principale
    alcoholContent: number; // gradazione alcolica (%)
    description: string; // breve descrizione
};
