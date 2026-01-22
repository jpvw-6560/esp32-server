# ESP32 Server – Nouvelle architecture MVC

Ce projet est la refonte complète de l’application de gestion ESP32, avec :
- Backend en **NestJS** (TypeScript, REST, TypeORM, MySQL)
- Frontend en **React** (Vite, TypeScript, CSS modules)
- Séparation stricte des responsabilités (MVC)

## Fonctionnalités principales
- Gestion des modules ESP32 (ajout, suivi, configuration)
- Aperçu temps réel des IOs (capteurs/actionneurs)
- Gestion des événements, historiques, logs
- Interface dédiée pour modules caméra (flash, photo, stream)
- Bufferisation RAM et flush différé pour robustesse/scalabilité (voir ci-dessous)

## Bufferisation RAM & Flush différé (SCADA-like)

- Toutes les écritures critiques (événements, MIS, MIE, io_points, etc.) ne sont plus faites directement en base MySQL.
- Les callbacks (API, ESP, etc.) écrivent d'abord dans une RTDB (mémoire vive, RAM) pour garantir un état temps réel instantané.
- Chaque changement est ajouté dans un buffer RAM.
- Un flush asynchrone (toutes les X secondes) vide le buffer et applique les changements en base MySQL par lots.

### Avantages
- Temps réel garanti côté serveur (lecture/écriture en RAM)
- Réduction drastique de la charge sur MySQL
- Scalabilité et robustesse accrues
- Historique et logs possibles via le buffer

### Exemple de flux

```
Callback ESP/API → RTDB (RAM)
                  ↓
              Buffer RAM
                  ↓
           Flush asynchrone
                  ↓
                MySQL
```

### Fichiers concernés (ancienne version)
- core/buffer_store.js : Buffer générique RAM + flush
- core/buffer_io_points.js : Buffer pour io_points
- core/rtdb_io.js : RTDB (RAM) pour io_points
- events/event_log.js, core/mis_store.js, core/mie_store.js : Bufferisation des autres entités

Dans la nouvelle version, cette logique est migrée dans les services NestJS (voir dossier backend/src/).

## Structure du projet

- `backend/` : API NestJS, entités, services, contrôleurs, config
- `frontend/` : React, pages, composants, styles, routing
- `doc/` : documentation technique et migration

## Installation rapide

```bash
cd backend
npm install
npm run start:dev

cd ../frontend
npm install
npm run dev
```

## Auteur
- Migration, refonte et documentation : jpvw
- Repo GitHub : https://github.com/jpvw-6560/esp32-server
