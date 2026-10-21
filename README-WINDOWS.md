# G-Eglise — socle de reconstruction Windows

Cette branche prépare l'emballage de l'application existante en application Windows installable, sans remplacer le fichier historique `index.html`.

## État de cette première étape

- Ajout d'un lanceur Electron avec isolation du contexte et accès Node.js désactivé dans la page.
- Configuration de création d'un installateur Windows NSIS 64 bits.
- Raccourcis Menu Démarrer et Bureau.
- Le désinstallateur ne supprime pas automatiquement les données utilisateur.
- L'application existante reste le point d'entrée afin de préserver les fonctions déjà présentes.

Ce socle de packaging ne certifie pas encore l'application complète. La configuration Firebase, la synchronisation hors ligne, les rôles et les règles de sécurité doivent être audités et testés avant une mise en production.

## Prérequis

- Windows 10/11 64 bits
- Node.js LTS installé
- Connexion Internet pour installer les dépendances et utiliser Firebase

## Démarrer en mode développement

Dans un terminal ouvert à la racine du dépôt :

```powershell
npm install
npm start
```

## Générer l'installateur

```powershell
npm run dist
```

Le fichier d'installation sera généré dans le dossier `dist`.

## Contrôles avant distribution

1. Vérifier que les bibliothèques chargées depuis des CDN dans `index.html` sont disponibles ou les intégrer localement.
2. Vérifier l'initialisation Firebase et les règles Realtime Database du projet `g-eglise`.
3. Tester les rôles Admin, Pasteur principal, Trésorière et autres utilisateurs.
4. Tester les opérations hors ligne, la file de synchronisation, les conflits et les suppressions.
5. Vérifier la sauvegarde/restauration et la migration des données existantes.
6. Ne jamais inclure de mot de passe administrateur, de clé privée ou de secret serveur dans le code client.
7. Utiliser Firebase Authentication et des règles serveur pour appliquer les autorisations. Masquer un bouton dans l'interface ne constitue pas une sécurité.
8. Une APK ultérieure devra partager le même backend et les mêmes règles d'accès que la version Windows.

## Commandes utiles

- `npm start` : ouvrir l'application Electron
- `npm run dist` : construire l'installateur NSIS
- `npm run dist:dir` : créer un dossier applicatif pour un test rapide

Ne distribuez pas l'installateur avant les tests fonctionnels et de sécurité sur une machine Windows propre.
