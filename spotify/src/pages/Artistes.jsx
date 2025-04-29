import { useEffect, useState } from "react";

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const artistsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:8000/artists")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des artistes");
        }
        return response.json();
      })
      .then((data) => {
        setArtists(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des artistes :", error);
      });
  }, []);

  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = artists.slice(indexOfFirstArtist, indexOfLastArtist);

  const totalPages = Math.ceil(artists.length / artistsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Liste des Artistes</h1>
      <ul>
        {currentArtists.map((artist) => (
          <li key={artist.id}>
            <h2>{artist.name}</h2>
            {artist.description && (
              <p style={{ maxWidth: "400px", marginTop: "1rem" }}>
                {artist.description}
              </p>
            )}
            {artist.photo && (
              <img
                src={artist.photo}
                alt={`Photo de ${artist.name}`}
                style={{ width: "150px", borderRadius: "8px" }}
              />
            )}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <h3>Page actuelle : {currentPage}</h3>
        <button
          onClick={() => paginate(1)}
          disabled={currentPage === 1}
          style={{
            margin: "0 5px",
            padding: "0.5rem 1rem",
            backgroundColor: "#f9f9f9",
            color: "#000",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          {"<<<"}
        </button>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            margin: "0 5px",
            padding: "0.5rem 1rem",
            backgroundColor: "#f9f9f9",
            color: "#000",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Précédent
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            margin: "0 5px",
            padding: "0.5rem 1rem",
            backgroundColor: "#f9f9f9",
            color: "#000",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Suivant
        </button>
        <button
          onClick={() => paginate(totalPages)}
          disabled={currentPage === totalPages}
          style={{
            margin: "0 5px",
            padding: "0.5rem 1rem",
            backgroundColor: "#f9f9f9",
            color: "#000",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          {">>>"}
        </button>
      </div>
    </div>
  );
};

export default ArtistsPage;