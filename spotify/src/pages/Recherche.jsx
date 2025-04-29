import { useState } from "react";

const RESULTATS_PAR_PAGE = 5;

const Recherche = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("genre");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setPage(1); // Réinitialise la page
    setResults([]); // Vide les anciens résultats
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/search?query=${encodeURIComponent(query)}&type=${type}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la recherche");
        }
        return response.json();
      })
      .then((data) => {
        if (type === "genre") {
          setResults(data.genres || []);
        } else if (type === "album") {
          setResults(data.albums || []);
        } else if (type === "artiste") {
          setResults(data.artists || []);
        }
        setPage(1); // Revenir à la première page
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  };

  const indexDebut = (page - 1) * RESULTATS_PAR_PAGE;
  const indexFin = indexDebut + RESULTATS_PAR_PAGE;
  const resultatsAffiches = results.slice(indexDebut, indexFin);

  const nombrePages = Math.ceil(results.length / RESULTATS_PAR_PAGE);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Recherche</h1>

      <form onSubmit={handleSubmit}>
        <select
          value={type}
          onChange={handleTypeChange}
          style={{ padding: "0.5rem", marginRight: "1rem" }}
        >
          <option value="genre">Genre</option>
          <option value="album">Album</option>
          <option value="artiste">Artiste</option>
        </select>

        <input
          type="text"
          placeholder={`Tape un ${type}`}
          value={query}
          onChange={handleInputChange}
          style={{
            padding: "0.5rem",
            width: "300px",
            marginRight: "1rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Rechercher
        </button>
      </form>

      {/* Résultats */}
      <ul style={{ marginTop: "2rem" }}>
        {resultatsAffiches.length > 0 ? (
          resultatsAffiches.map((item) => (
            <li key={item.id}>
              {type === "album" && item.title}
              {type === "artiste" && item.name}
              {type === "genre" && item.name}
            </li>
          ))
        ) : (
          <p>Aucun résultat</p>
        )}
      </ul>

      {/* Pagination */}
      {results.length > RESULTATS_PAR_PAGE && (
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            style={{ marginRight: "1rem" }}
          >
            ◀ Précédent
          </button>
          <span>Page {page} / {nombrePages}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === nombrePages}
            style={{ marginLeft: "1rem" }}
          >
            Suivant ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default Recherche;
