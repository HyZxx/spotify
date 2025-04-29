const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "new_user",
  password: "password", 
  database: "spotify",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

app.get("/albums/:id/tracks", (req, res) => {
    const albumId = req.params.id;
  
    const query = `
      SELECT tracks.id, tracks.name, tracks.mp3
      FROM tracks
      WHERE tracks.album_id = ?
    `;
  
    db.query(query, [albumId], (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des pistes :", err);
        res.status(500).json({ error: "Erreur lors de la récupération des pistes" });
      } else {
        console.log("Résultats des pistes :", results); // Ajoutez ce log
        res.json(results);
      }
    });
  });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});