# Bufferisation RAM & Flush différé (SCADA-like)

## Principe

- Toutes les écritures critiques (événements, MIS, MIE, io_points, etc.) ne sont plus faites directement en base MySQL.
- Les callbacks (API, ESP, etc.) écrivent d'abord dans une RTDB (mémoire vive, RAM) pour garantir un état temps réel instantané.
- Chaque changement est ajouté dans un buffer RAM.
- Un flush asynchrone (toutes les X secondes) vide le buffer et applique les changements en base MySQL par lots.

## Avantages
- Temps réel garanti côté serveur (lecture/écriture en RAM)
- Réduction drastique de la charge sur MySQL
- Scalabilité et robustesse accrues
- Historique et logs possibles via le buffer

## Exemple de flux

```
Callback ESP/API → RTDB (RAM)
                  ↓
              Buffer RAM
                  ↓
           Flush asynchrone
                  ↓
                MySQL
```

## Fichiers concernés
- core/buffer_store.js : Buffer générique RAM + flush
- core/buffer_io_points.js : Buffer pour io_points
- core/rtdb_io.js : RTDB (RAM) pour io_points
- events/event_log.js, core/mis_store.js, core/mie_store.js : Bufferisation des autres entités

## Utilisation
- Les routes API écrivent en RAM et bufferisent.
- La base MySQL est synchronisée toutes les X secondes (par défaut 5s).
- La lecture instantanée se fait en RAM, la base sert d'historique et de persistance.

---

Pour toute extension ou adaptation, suivre ce modèle pour garantir performance et robustesse.
