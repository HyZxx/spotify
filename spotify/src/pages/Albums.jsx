import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:8000/albums")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des albums");
        }
        return response.json();
      })
      .then((data) => {
        setAlbums(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des albums :", error);
      });
  }, []);

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  const totalPages = Math.ceil(albums.length / albumsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Liste des Albums</h1>
      <ul>
        {currentAlbums.map((album) => (
          <li key={album.id}>
            {album.cover_small && (
              <img
                src={album.cover_small}
                alt={`Photo de ${album.cover_small}`}
                style={{ width: "150px", borderRadius: "8px" }}
              />
            )}
            <br></br>
            {/* Bouton redirection vers AlbumDetail */}
            <Link to={`/albumdetail/${album.id}`}>
              <button style={{ marginTop: "1rem" }}>Voir les détails</button>
            </Link>
            {album.description && (
              <p style={{ maxWidth: "900px", marginTop: "1rem" }}>
                {album.description}
                <br></br>
              </p>
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
          {'<<<'}
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
          {'>>>'}
        </button>
      </div>
    </div>
  );
};

export default AlbumsPage;