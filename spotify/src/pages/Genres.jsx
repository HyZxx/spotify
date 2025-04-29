import { useEffect, useState } from "react";

const GenresPage = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/genres")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des genres");
        }
        return response.json();
      })
      .then((data) => {
        setGenres(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des genres :", error);
      });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Liste des Genres</h1>
      <ul>
        {genres.map((genres) => (
          <li key={genres.id}>{genres.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GenresPage;
