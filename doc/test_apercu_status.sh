#!/bin/bash
# Test de l'affichage du statut ONLINE/OFFLINE dans l'Aperçu

echo "🧪 Test de la vue Aperçu avec statut ONLINE/OFFLINE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "1️⃣ Vérification de l'API /api/realtime/modules"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
curl -s http://localhost:3000/api/realtime/modules | jq -r '.modules[] | "
Module: \(.device_name) (\(.type))
  MAC: \(.mac)
  IP: \(.ip_address)
  ID: \(.id)
  Status: \(if .online then "🟢 ONLINE" else "🔴 OFFLINE" end)
  Last seen: \(.last_seen // "jamais vu")
  Seconds since: \(.seconds_since_last_seen // "N/A")s
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"'

echo ""
echo "2️⃣ Fichiers modifiés"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ public/admin.js - Ajout du badge statut + formatage temps"
echo "✅ public/admin.css - Styles pour .badge-online et .badge-offline"
echo ""

echo "3️⃣ Accès à la page Aperçu"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 Ouvrez votre navigateur sur:"
echo "   http://localhost:3000/admin.html"
echo ""
echo "📊 Vous devriez voir pour chaque module:"
echo "   esp001 (ESP32)"
echo "   MAC: A8:42:E3:AB:16:20"
echo "   IP: 192.168.129.1"
echo "   ID: 8"
echo "   🟢 ONLINE (vu il y a XXs)"
echo ""
echo "   OU"
echo ""
echo "   🔴 OFFLINE"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Test terminé - Rechargez la page admin.html pour voir les changements"
