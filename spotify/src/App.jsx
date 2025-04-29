import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Albums from "./pages/Albums";
import Artistes from "./pages/Artistes";
import Genres from "./pages/Genres";
import AlbumDetail from "./pages/AlbumDetail";
import Recherche from "./pages/Recherche";

function App() {
  return (
    <Router>
      <div>
        <h1>Bienvenue sur Spotify</h1>
        <nav>
          <Link to="/albums">
            <button>Afficher les albums</button>
          </Link>
          <Link to="/artistes">
            <button>Afficher les artistes</button>
          </Link>
          <Link to="/genres">
            <button>Afficher les genres</button>
          </Link>
          <Link to="/Recherche">
            <button>Recherche</button>
          </Link>
          <Link to="/">
            <button>Réinitialiser</button>
          </Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <p>Sélectionnez une option pour afficher les albums, artistes ou genres.</p>
              </div>
            }
          />
          <Route path="/albums" element={<Albums />} />
          <Route path="/artistes" element={<Artistes />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/albumdetail/:id" element={<AlbumDetail />} />
          <Route path="/recherche" element={<Recherche />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;