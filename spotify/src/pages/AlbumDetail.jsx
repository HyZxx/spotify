import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const AlbumDetail = () => {
  const { id } = useParams(); 
  const [album, setAlbum] = useState(null); 
  const [tracks, setTracks] = useState([]);
  const [artist, setArtist] = useState(null); 
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const audioRefs = useRef({});

  useEffect(() => {
    // Détails de l'album
    fetch(`http://localhost:8000/albums/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des détails de l'album");
        }
        return response.json();
      })
      .then((data) => {
        setAlbum(data.album); 
        
        if (data.artist_id) {
          return fetch(`http://localhost:8000/artists/${data.artist_id}`);
        }
        throw new Error("Aucun artist_id trouvé pour cet album");
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des détails de l'artiste");
        }
        return response.json();
      })
      .then((artistData) => {
        setArtist(artistData.artists); 
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });

      fetch(`http://localhost:5000/albums/${id}/tracks`)
    .then((response) => {
        if (!response.ok) {
        throw new Error("Erreur lors de la récupération des pistes de l'album");
        }
        return response.json();
    })
    .then((data) => {
        setTracks(data);
    })
    .catch((error) => {
        console.error("Erreur lors de la récupération des pistes :", error);
    });
  }, [id]);

  const handlePlay = (trackId) => {
    Object.keys(audioRefs.current).forEach((key) => {
      if (key !== String(trackId) && audioRefs.current[key]) {
        audioRefs.current[key].pause();
      }
    });

    setCurrentTrackId(trackId);
  };

  if (!album) {
    return <p>Aucun détail trouvé pour cet album.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{album.name || "Nom de l'album non disponible"}</h1>
      {album.cover_small && (
        <img
          src={album.cover_small}
          alt={`Photo de ${album.name}`}
          style={{ width: "300px", borderRadius: "8px", marginBottom: "1rem" }}
        />
      )}
      <p><strong>Artiste id :</strong> {album.artist_id || "Artiste non disponible"}</p>
      <p><strong>Popularité :</strong> {album.popularity || "Artiste non disponible"}</p>
      <p><strong>Description :</strong> {album.description || "Description non disponible"}</p>
      <p><strong>Date de sortie :</strong> {album.release_date || "Date non disponible"}</p>
      <h2>Pistes de l'album</h2>
      {tracks.length > 0 ? (
        <ul>
          {tracks.map((track) => (
            <li key={track.id} style={{ marginBottom: "1rem" }}>
              <p><strong>{track.name}</strong></p>
              {track.mp3 && (
                <audio
                ref={(el) => (audioRefs.current[track.id] = el)}
                controls
                onPlay={() => handlePlay(track.id)} 
                src={track.mp3}
                type="audio/mpeg"
              >
                Votre navigateur ne supporte pas l'élément audio.
              </audio>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune piste disponible pour cet album.</p>
      )}
    </div>
  );
};

export default AlbumDetail;