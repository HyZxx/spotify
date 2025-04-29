# Lancer docker

Vérifier si l'image docker est lancé :
- `sudo docker ps -a`

Si il est éteint :
- `sudo docker start (l'id de l'image)`

Lancer le site :
- `cd spotify`
- `npm run dev`

# Installer/Connecter la db

Installer le package :
- `cd backend`
- `npm install express mysql2 cors`

Se connecter a la db :
- Mettre ses identifiants msql dans index
- `mysql -u (nom) -p (mdp)`
- `CREATE DATABASE spotify;`
- `USE spotify`
- `SOURCE ./Archive/my_spotify_db.sql`

Lancer le backend :
- `cd backend`
- `node index.js`
