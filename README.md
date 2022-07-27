
# Groupomania

Groupomania est un réseau social interne pour ses employés. Le but de cet outil est de faciliter les interactions entre collègues.


## Installation

Pour ce projet vous aurez besoin de MySQL: https://dev.mysql.com/downloads/installer/
et de Node.js: https://nodejs.org/en/

### git

```bash
  git clone le projet
```

### Base de donnée

Connection à MySQL

```bash
  CREATE DATABASE groupomania;
```

Dans le terminal Windows / se placer dans le dossier cloné

```bash
  mysql -u [utilisateur] -p groupomania < groupomania.sql
```

### Backend

```bash
  cd .\backend\
```

#### Installation des packages

```bash
  npm i
  nodemon server
```

#### Installation de la base de donnée

```bash
  npx prisma migrate dev --name init
```

#### Création d'un fichier .env

```bash
  DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE
```

### Frontend

#### Installation des packages

```bash
  cd .\frontend\
  npm i
  npm run dev
```

Connectez vous au site: http://localhost:3000/

    
