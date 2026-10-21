# Audit préalable à la mise en production — G-Eglise

Date : 21 octobre 2026

## Résultat principal

Le dépôt existant contient déjà une interface fonctionnelle et des modules de gestion. La première étape Windows réutilise cette interface pour limiter le risque de perte de fonctions. Le packaging Electron est en cours de validation via GitHub Actions.

## Points de sécurité constatés dans le code existant

1. **Authentification locale uniquement** : la méthode `Auth.login()` compare l'identifiant et le mot de passe avec les objets du magasin IndexedDB `utilisateurs`. Aucun appel à Firebase Authentication n'est présent dans ce flux.
2. **Mot de passe stocké en clair** : le code compare directement `u.password === password`. Les comptes existants doivent être migrés avec une procédure contrôlée ; ne pas copier les mots de passe en clair dans Firebase.
3. **Session locale contenant l'objet utilisateur** : `G_EGLISE_SESSION` est écrit dans `localStorage`. La session doit être repensée pour ne jamais conserver le mot de passe et pour gérer expiration/déconnexion.
4. **Synchronisation Firebase sans identité utilisateur démontrée** : le code `FirebaseSync` lit et écrit sous `geglise/{storeName}` via la Realtime Database. Le code client seul ne prouve pas que les règles Firebase bloquent les utilisateurs non autorisés.
5. **Permissions appliquées côté interface** : les permissions `Auth.can()` masquent/ouvrent les modules mais ne remplacent pas les règles de sécurité serveur.

Ces constats sont des risques à vérifier et corriger, pas une preuve que la base Firebase est publiquement accessible. Les règles actuelles de la Realtime Database doivent être examinées dans la console Firebase avant tout déploiement.

## Conditions obligatoires avant APK multi-utilisateur

- Configurer Firebase Authentication ou un mécanisme d'identité vérifiable équivalent.
- Établir des règles Realtime Database qui refusent par défaut les accès anonymes et vérifient le rôle côté serveur.
- Définir les rôles Admin, Pasteur principal, Trésorière et autres utilisateurs avec des autorisations minimales.
- Retirer les mots de passe des sessions et ne jamais les synchroniser dans les enregistrements utilisateurs.
- Tester les accès refusés pour les opérations non autorisées, y compris les accès directs à Firebase.
- Vérifier sauvegarde/restauration, révocation d'un compte, synchronisation hors ligne et conflits multi-appareils.
- Réaliser la migration des comptes et données après une sauvegarde vérifiée.

## Dépendances externes

Font Awesome et Chart.js sont maintenant référencés depuis les dépendances locales du projet pour éviter deux CDN d'interface. Les scripts Firebase Compat sont encore chargés depuis `gstatic.com` ; une utilisation hors ligne complète exige de les embarquer localement ou de prévoir une stratégie de démarrage qui laisse les données locales accessibles lorsque le réseau est indisponible.

## Portée de cette branche

Cette branche prépare le paquet Windows ; elle ne prétend pas avoir corrigé les points de sécurité ci-dessus. Ne pas fusionner en production ni distribuer l'application à plusieurs utilisateurs tant que ces contrôles ne sont pas réalisés.
