# Product

## Register

brand

## Users

Trois publics principaux, dans l'ordre de fréquence supposée :

1. **Locaux & habitués** (Nieul-sur-Mer, La Rochelle, Charente-Maritime). Connaissent déjà la maison ou en ont entendu parler. Viennent pour réserver, vérifier horaires/arrivages, suivre l'actu de la cabane. Contexte : usage mobile rapide, souvent en mouvement.
2. **Touristes Charente-Maritime**. Découvrent la région, cherchent une expérience authentique au bord de l'eau. Premier contact via Google ou réseaux. Ils décident en quelques secondes si l'endroit vaut le détour. Contexte : recherche mobile, comparaison avec d'autres adresses.
3. **Foodies & gastronomes**. Curieux d'huîtres haut de gamme. Sensibles au storytelling — l'histoire des Lebon entre Atlantique et La Réunion les retient. Contexte : lecture posée, souvent desktop, prennent le temps.

Pas de cible "pros restaurateurs" sur ce site — c'est un canal direct au client final.

## Product Purpose

Vitrine et porte d'entrée de la Cabane 135 (par Huîtres Lebon) à Nieul-sur-Mer. Le site existe pour :

- **Raconter** l'histoire singulière des Lebon, ostréiculteurs entre Charente-Maritime et La Réunion, qui ouvrent leur cabane le 1ᵉʳ mai 2026 au bord des marais.
- **Donner envie de venir** — déclencher une réservation, une visite spontanée, un follow Instagram.
- **Servir** les habitués avec ce qu'ils cherchent en 3 secondes : adresse, horaires, contact, dernier arrivage.
- **Préparer** l'élargissement (vente à emporter, événements, plateaux) sans surcharger.

Succès = la personne qui découvre le site comprend en 5 secondes "qui, où, pourquoi venir", et a envie de pousser la porte ou réserver.

## Brand Personality

**Éditorial · Maritime · Confidentiel.**

- **Éditorial** : la typographie respire, le texte raconte, la mise en page ressemble plus à un magazine de gastronomie qu'à une fiche commerciale. Cormorant Garamond pour les titres, hiérarchie marquée, longueurs de lignes maîtrisées.
- **Maritime** : palette qui évoque l'estuaire à l'aube (navy profond, gold-amber d'huître, turquoise de lagon, pearl-nacré). Pas la mer turquoise carte postale — la lumière humide de la baie au lever du jour, avec ses contrastes.
- **Confidentiel** : on n'est pas un catalogue. Adresse d'initié, on chuchote plutôt qu'on crie. Les CTA sont précis et discrets (boutons fins, lettrage espacé), pas de "RÉSERVE MAINTENANT !!!".

Émotions visées : envie d'y aller, sentiment de découvrir un endroit qui a du goût, respect du métier.

## Anti-references

À éviter absolument :

- **SaaS startup générique** — gradients bleus, hero-metric "+50% de…", cards à icône répétitives, illustrations 3D corporate. Le cliché Stripe-like ne raconte rien d'une cabane d'ostréiculteur.
- **Marketplace brouillon** (Airbnb, TripAdvisor, La Fourchette). Listings, badges, étoiles, prix en hero, "réservez en 2 clics". Casse la confidentialité et la singularité.
- **Wellness/spa épuré fade** — beige uniforme, sans-serif linéaire générique, photos lifestyle vides. Trop neutre, sans accroche, sans goût de sel.
- **Restaurant cliché vieillot** — calligraphie tarabiscotée, parchemin, photos jaunies de coquillages. L'inverse de l'éditorial moderne qu'on vise.

## Design Principles

1. **L'histoire d'abord, le produit ensuite.** Lebon entre Atlantique et La Réunion est le fil narratif central. Toute décision design soutient ce récit — la chronologie, les photos des deux rivages, le texte au présent. La carte vient après.

2. **Le sel, pas le sucre.** On vise le confidentiel et le maritime, pas le "léché". Préférer le grain à la perfection, le contraste à l'uniformité, le silence à l'effet. Une seule chose forte par section.

3. **L'éditorial guide la mise en page.** Lignes courtes (65-75ch max), respirations généreuses, typographie hiérarchisée à l'évidence, photographies pleine largeur quand elles le méritent. Pas de mise en grille SaaS.

4. **Le local et le distant cohabitent.** Tension visuelle Atlantique × Réunion comme motif récurrent (deux rivages, deux lumières, deux époques). C'est l'ADN de la maison — il doit transparaître dans le rythme, pas seulement le texte.

5. **Mobile-first sans compromis sur l'éditorial.** Le local qui consulte en 5 secondes sur iPhone doit avoir tout (adresse, tel, statut ouvert) en 1 scroll. Mais sans dégrader la signature visuelle sur desktop. Adapter la hiérarchie, pas la marque.

## Accessibility & Inclusion

- **Cible WCAG 2.1 AA** sur les composants critiques (réservation, contact, navigation).
- **Reduced-motion** : déjà respecté via `LenisProvider` (smooth-scroll désactivé) et `useCanRender3D` (Three.js désactivé). À maintenir pour tout futur composant animé.
- **Contraste** : la palette navy/gold/turquoise/pearl doit garder un ratio ≥4.5:1 pour le texte courant. Vérifier à chaque ajout d'overlay sur image.
- **Mobile et zoom** : tout le texte doit rester lisible sur 320px avec zoom navigateur 200%. Pas de texte rendu en image.
- **Lecteurs d'écran** : `aria-hidden` sur les éléments décoratifs (canvas 3D, orbes, particules), labels explicites sur les CTA, navigation au clavier propre dans la modale de réservation.
- **i18n** : français uniquement à ce stade — pas de prévision multilingue à court terme.
