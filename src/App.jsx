import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Favorites from "./components/Favorites";
import { ComparatorProvider } from "./contexts/ComparatorContext";
import ComparePage from "./pages/ComparePage";


function App() {
  return (
    <BrowserRouter>
      <ComparatorProvider>
        <FavoritesProvider>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/wines/:id" element={<DetailPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/favorites" element={<Favorites />} />
            </Route>
          </Routes>
        </FavoritesProvider>
      </ComparatorProvider>
    </BrowserRouter>
  );
}

export default App;
