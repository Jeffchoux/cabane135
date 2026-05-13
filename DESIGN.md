---
name: Cabane 135
description: Bar à huîtres éditorial — l'estuaire à l'aube, entre Charente-Maritime et La Réunion.
colors:
  navy: "#0a1628"
  ocean: "#0f2035"
  teal: "#163a55"
  gold: "#c8a15a"
  turquoise: "#00b8d9"
  pearl: "#f2ece0"
  cream: "#faf7f2"
  glass: "rgba(255,255,255,0.04)"
  glass-border: "rgba(255,255,255,0.08)"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(3.5rem, 13vw, 11rem)"
    fontWeight: 300
    lineHeight: 0.95
    letterSpacing: "0.04em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 4rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "normal"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.25rem, 2vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Jost, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Jost, system-ui, sans-serif"
    fontSize: "0.65rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.4em"
rounded:
  none: "0"
  xs: "2px"
  sm: "4px"
  md: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  "2xl": "64px"
  "3xl": "112px"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.gold}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 32px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.navy}"
  button-ghost:
    backgroundColor: "{colors.glass}"
    textColor: "rgba(242,236,224,0.8)"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 32px"
    height: "48px"
  card-glass:
    backgroundColor: "rgba(15,32,53,0.7)"
    textColor: "{colors.pearl}"
    rounded: "{rounded.xs}"
    padding: "32px"
  input:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.pearl}"
    typography: "{typography.body}"
    rounded: "{rounded.xs}"
    height: "44px"
    padding: "0 16px"
  section-label:
    backgroundColor: "transparent"
    textColor: "{colors.gold}"
    typography: "{typography.label}"
---

# Design System: Cabane 135

## 1. Overview

**Creative North Star: "L'estuaire à l'aube"**

Cabane 135 vit dans la lumière humide de la baie au lever du jour. Le navy profond domine — c'est la mer avant que le soleil ne touche l'eau. Le pearl-nacré éclaire les titres comme la première lueur sur une coquille fraîchement ouverte. Le gold-amber ponctue rarement, comme la chair de l'huître. Le turquoise ne s'autorise qu'une apparition — celle du chiffre 135, la signature, le lagon réunionnais qui revient hanter la Charente.

Le système rejette frontalement quatre directions : les **gradients bleus SaaS** (Stripe, Linear corporate), les **listings de marketplace** (Airbnb, TripAdvisor, La Fourchette) qui réduisent une adresse à un score, le **wellness beige fade** qui anesthésie tout, et le **restaurant cliché vieillot** (calligraphie tarabiscotée, parchemin). On vise l'éditorial moderne d'un magazine de gastronomie — pas la fiche commerciale, pas le catalogue.

La typographie respire (Cormorant Garamond en signature, Jost en corps). Les lignes courtes (65-75ch). Les CTA chuchotent — bordure fine, lettrage espacé, fill liquide en hover. Une photographie pleine largeur vaut dix cards. Le rythme alterne récit et silence.

**Key Characteristics:**
- Fond navy profond constant — la nuit maritime, pas le dark mode tech.
- Gold-amber rare (≤10% de la surface) — l'huître qui s'ouvre, pas l'or qui clinque.
- Serif Cormorant 300 sur grandes échelles — signature, pas décoration.
- Photographies pleine largeur, pas de grids de cards.
- Animations exponential ease-out, jamais bounce, jamais elastic.
- Mobile-first sans dégrader la signature éditoriale.

## 2. Colors: La Palette de l'Estuaire

Quatre rôles, hiérarchie stricte. Aucune teinte additionnelle — la rareté est le sujet.

### Primary

- **Or d'Huître** (`#c8a15a`) : l'accent unique. CTA, dates pivot, liens, micro-labels en lettrage espacé, scrollbar. Apparaît rarement et toujours seul — jamais en dégradé, jamais en grande surface aplat.

### Secondary

- **Turquoise de Lagon** (`#00b8d9`) : la signature réunionnaise. Réservé au chiffre "135" du titre principal, au scroll-hint, à un focus d'accroche par section maximum. Si tu hésites à l'utiliser, ne l'utilise pas.

### Neutral

- **Navy d'Estuaire** (`#0a1628`) : fond principal, body, footer. La nuit avant l'aube.
- **Ocean Profond** (`#0f2035`) : layer de carte glass, modal background. Une nuance plus claire pour les éléments en élévation.
- **Teal Maritime** (`#163a55`) : bordures structurelles, dividers, états désactivés. Le bleu-vert des marais à l'ombre.
- **Pearl-Nacré** (`#f2ece0`) : texte principal, titres. La lueur sur la coquille.
- **Cream** (`#faf7f2`) : pages légales, surfaces très claires (rare). La nacre vue de très près.

### Named Rules

**La Règle des 10%.** L'Or d'Huître occupe au maximum 10% de la surface visible à tout moment. Sa rareté est le sujet. Si plus de 10% est nécessaire, c'est que la composition est ratée — repenser, ne pas ajouter d'or.

**La Règle d'Une Voix Turquoise.** Le Turquoise de Lagon n'apparaît qu'une seule fois par viewport, et porte une intention précise (le 135, un état actif). Jamais en bordure décorative, jamais en background.

**La Règle Anti-Gradient.** Aucun dégradé de couleur sur du texte, des CTA, des cards. Les seuls dégradés autorisés sont les overlays photographiques (linear-gradient navy→transparent pour assombrir une image). `background-clip: text` est interdit.

## 3. Typography

**Display Font:** Cormorant Garamond (avec Georgia, serif en fallback)
**Body Font:** Jost (avec system-ui, sans-serif en fallback)

**Character:** Un duo éditorial classique — un serif italianisant haut de gamme (Garamond) pour la voix, un grotesque géométrique humaniste (Jost) pour l'information. Le serif chante, le sans chuchote.

### Hierarchy

- **Display** (Cormorant 300, `clamp(3.5rem, 13vw, 11rem)`, line-height 0.95, letter-spacing 0.04em) : le titre "CABANE 135" et lui seul. Jamais réutilisé pour des H2 ou H3.
- **Headline** (Cormorant 300, `clamp(2.25rem, 5vw, 4rem)`, line-height 1.1) : titres de section ("Nicolas & Nadège Lebon", "La dégustation", "Nous trouver").
- **Title** (Cormorant 400, `clamp(1.25rem, 2vw, 1.75rem)`, line-height 1.3) : sous-titres de bloc, items de liste éditoriale.
- **Body** (Jost 300, 1rem, line-height 1.7) : tout le corps de texte. Lignes capées à 65-75ch.
- **Label** (Jost 500, 0.65rem, letter-spacing 0.4em, uppercase) : section-labels gold ("L'HISTOIRE", "À LA CABANE"), micro-info en majuscules espacées, CTA.

### Named Rules

**La Règle de la Signature Unique.** Le Display (Cormorant 11rem) n'apparaît qu'une fois par page — pour le titre "CABANE 135". Toute autre utilisation banalise la signature et casse la hiérarchie.

**La Règle des Lignes Courtes.** Body capé à 65-75ch (≈ `max-width: 65ch`). Au-delà, l'œil décroche. C'est éditorial, pas page d'accueil produit.

**La Règle du Tracking.** Les labels en majuscules portent toujours un letter-spacing d'au moins 0.3em. C'est le rythme du magazine, pas du dashboard.

**L'Italique Réservé.** L'italique Cormorant est réservé à deux usages : la sous-signature "by Huîtres Lebon" (toujours) et la mise en relief de noms propres dans le récit (Huîtres Lebon, Cabane 135 dans le texte courant). Pas d'italique décoratif.

## 4. Elevation

Le système est **flat par défaut, glass par exception**. Aucune ombre tonale ne porte de sens — la profondeur naît du contraste navy/pearl et de la photographie. Le `backdrop-filter: blur` sert exclusivement à isoler les surfaces en élévation réelle (navigation fixe, modale de réservation, carte de glass-strong sur photo).

### Shadow Vocabulary

Aucune `box-shadow`. Si un élément doit "flotter", il flotte par contraste de fond, pas par ombre portée.

### Glass Vocabulary

- **glass** (`background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(16px)`) : nav fixe, boutons secondaires, cards d'info légères. Voile à peine perceptible.
- **glass-strong** (`background: rgba(15,32,53,0.7); border: 1px solid rgba(200,161,90,0.2); backdrop-filter: blur(32px)`) : modale de réservation, login admin, surfaces critiques superposées à une photo. Bordure or pour la promesse.

### Named Rules

**La Règle Flat-Par-Défaut.** Aucune `box-shadow` sur un composant. Si tu écris `box-shadow:`, repenser la structure — le contraste, le blur, ou un border-1px avec une teinte d'or font le travail.

**La Règle du Glass Justifié.** Le glassmorphism n'est jamais décoratif. Il sert uniquement à séparer un contenu d'une photographie en arrière-plan (modale sur hero image, label sur photo). Pas de glass cards en grid sur fond uni.

## 5. Components

### Buttons

- **Shape:** angles droits — `border-radius: 0`. La sharpness fait partie de l'éditorial.
- **Primary (`btn-liquid`):** bordure fine `1px solid #c8a15a`, texte gold en label (0.65rem, tracking 0.32em, uppercase), padding `0 32px`, hauteur `48px`. Fond transparent.
- **Hover Primary:** fill gold liquide qui balaye de gauche à droite (`transform: scaleX(0→1)`, cubic-bezier `0.65,0,0.35,1`, 500ms). Le texte passe en navy. Aucune translation Y, aucun bounce.
- **Ghost (secondaire):** background `glass`, texte `rgba(242,236,224,0.8)`, même typo et dimensions. Hover : texte passe en pearl pur. Pas de fill.
- **Focus visible:** outline `2px solid rgba(200,161,90,0.5)`, offset 3px, radius 4px. Visible et calme, jamais agressif.

### Inputs / Fields

- **Style:** background `var(--glass)`, bordure `1px solid rgba(255,255,255,0.08)`, texte pearl, hauteur 44px. Pas de placeholder en italique.
- **Label:** au-dessus, en label-style (gold 0.65rem tracking 0.3em uppercase + astérisque or pour required).
- **Focus:** bordure passe à `rgba(200,161,90,0.5)`. Aucun glow externe.
- **Error:** bordure `rgba(220,80,80,0.5)`, message rouge muté sous le champ, jamais en tooltip.

### Cards / Containers

- **Corner Style:** `border-radius: 2px` (xs) ou 0 selon le contexte. Pas de `rounded-lg`, pas de rounded-full sur des cards.
- **Background:** soit transparent (la photo est la card), soit `glass-strong` si superposé.
- **Shadow Strategy:** aucune.
- **Border:** `1px solid rgba(200,161,90,0.20)` quand isolation nécessaire — bordure or à 20% pour l'élégance, pas de bordure pleine.
- **Internal Padding:** 32px (lg) ou 24-40px selon le poids.
- **Hover (`bento-card`):** une ligne or 2px naît à la base et balaye de gauche à droite en 500ms. Pas de translate, pas de scale.

### Navigation

- **Style:** position fixed en haut, fond `glass` (blur 16px), padding vertical 16px. Logo à gauche (image carrée 32px + serif "CABANE 135"), liens centrés/droite en label-style (0.65rem, tracking 0.32em, uppercase, pearl 80%).
- **Hover:** liens passent à pearl 100%. Pas de soulignement, pas de background.
- **Active:** indicateur or 1px sous le lien actif (apparaît au scroll, 1px d'épaisseur, 100% de la largeur du label).
- **Mobile (<768px):** menu hamburger à droite — drawer plein écran navy avec liens en stack vertical centré. Fermeture par croix or en haut à droite.

### Section Labels

Le micro-élément signature du système. Toujours en haut d'une section : Jost 500, 0.65rem, letter-spacing 0.4em, uppercase, couleur or. Précède chaque headline. C'est l'équivalent typographique d'une coupe au laser.

### Signature Component — La Timeline Éditoriale

Liste ordonnée avec bordure or à 25% à gauche, puces or 8px sur la bordure (offset -31px), micro-label or (année · lieu) et corps en pearl-70%. Pas de cards, pas d'icônes — juste la verticale du temps.

## 6. Do's and Don'ts

### Do:

- **Do** réserver le Display Cormorant 300 (11rem) au seul titre "CABANE 135" — c'est la signature, pas un style.
- **Do** utiliser le gold sur ≤10% de la surface visible à tout moment.
- **Do** caper les paragraphes à 65-75ch. Le confort de lecture est un signe de respect du lecteur.
- **Do** numéroter les blocs éditoriaux (01 / 02 / 03) en gold trackés — c'est le rythme du magazine.
- **Do** privilégier les photographies pleine largeur aux grids de cards.
- **Do** utiliser le turquoise une seule fois par viewport, et toujours pour porter une intention (le "135", un état actif).
- **Do** utiliser `cubic-bezier(0.16, 1, 0.3, 1)` (exponential ease-out) pour toutes les transitions.
- **Do** respecter `prefers-reduced-motion` — désactiver `LenisProvider` smooth-scroll et `useCanRender3D` Three.js.
- **Do** garder un ratio de contraste ≥ 4.5:1 sur tout texte courant (vérifier les overlays sur image).

### Don't:

- **Don't** utiliser de gradient sur du texte (`background-clip: text` interdit). L'emphase passe par le poids ou la taille.
- **Don't** utiliser de gradient bleu SaaS — c'est le cliché Stripe/Linear, on rejette frontalement (PRODUCT.md anti-référence #1).
- **Don't** construire de hero-metric ("+50% de…", "1500 huîtres servies"). C'est le template SaaS qu'on combat.
- **Don't** empiler des cards à icône identiques en grid — c'est le slop AI évident.
- **Don't** afficher de badges étoiles, de prix en hero, de "réservez en 2 clics" — c'est le langage marketplace qu'on rejette (PRODUCT.md anti-référence #2).
- **Don't** virer vers le beige uniforme + sans-serif fade — c'est le piège wellness sans goût (PRODUCT.md anti-référence #3).
- **Don't** céder à la calligraphie tarabiscotée, au parchemin, aux photos jaunies — c'est l'inverse de l'éditorial moderne qu'on vise.
- **Don't** utiliser de `box-shadow`. Si tu en as besoin, repenser le contraste ou utiliser un glass.
- **Don't** utiliser de `border-left` ou `border-right` >1px en accent coloré sur cards/callouts — c'est le stripe SaaS interdit par la skill.
- **Don't** utiliser des modales en premier réflexe. La réservation est modale parce qu'elle interrompt — sinon, préférer l'inline progressive.
- **Don't** animer des propriétés de layout (`width`, `height`, `top`, `left`). Utiliser `transform` et `opacity` uniquement.
- **Don't** utiliser de bounce ou elastic. Exponential ease-out, point.
- **Don't** mettre de couleur "wellness" (beige uniforme, sans accent) — la palette est navy-dominée, point.
- **Don't** banaliser le turquoise — c'est l'éclair réunionnais, pas un accent générique.
