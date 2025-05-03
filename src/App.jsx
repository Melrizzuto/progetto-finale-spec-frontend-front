// importo gli elementi per gestire le rotte dell'app
import { BrowserRouter, Routes, Route } from "react-router-dom";
// importo il layout che include header, footer e outlet
import DefaultLayout from "./layout/DefaultLayout";
// importo le pagine principali
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import Favorites from "./pages/FavoritesPage";
import ComparePage from "./pages/ComparePage";
// importo i context per gestire preferiti e confronto
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ComparatorProvider } from "./contexts/ComparatorContext";

function App() {
  return (
    // avvolgo l'app nel router per gestire le rotte
    <BrowserRouter>
      {/* avvolgo tutto con il provider del comparatore */}
      <ComparatorProvider>
        {/* avvolgo tutto anche con il provider dei preferiti */}
        <FavoritesProvider>
          {/* definisco la struttura delle rotte */}
          <Routes>
            {/* uso un layout di default per tutte le pagine */}
            <Route element={<DefaultLayout />}>
              {/* homepage con la lista dei vini */}
              <Route path="/" element={<HomePage />} />
              {/* pagina di dettaglio del vino */}
              <Route path="/wines/:id" element={<DetailPage />} />
              {/* pagina per confrontare due vini */}
              <Route path="/compare" element={<ComparePage />} />
              {/* pagina dei preferiti */}
              <Route path="/favorites" element={<Favorites />} />
            </Route>
          </Routes>
        </FavoritesProvider>
      </ComparatorProvider>
    </BrowserRouter>
  );
}

export default App;
