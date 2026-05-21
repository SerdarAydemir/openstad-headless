# @openstad-headless/fix-je-shit

Quiz widget voor jongeren (16–27 jaar) om te checken of ze belangrijke zaken geregeld hebben.

## Ontwikkeling

### Standalone (zonder OpenStad)

```bash
cd packages/fix-je-shit
npm install
npm run dev
```

Open `http://localhost:5173` in je browser.

### Binnen OpenStad Headless

1. Kopieer deze map naar `packages/fix-je-shit/`
2. Voeg dependency toe aan `apps/api-server/package.json`:
   ```json
   "@openstad-headless/fix-je-shit": "file:../../packages/fix-je-shit"
   ```
3. Voeg widget toe aan `widget-settings.js`:
   ```javascript
   fixjeshit: {
     js: ['@openstad-headless/fix-je-shit/dist/fix-je-shit.iife.js'],
     css: ['@openstad-headless/fix-je-shit/dist/style.css'],
     functionName: 'OpenstadHeadlessFixJeShit',
     componentName: 'FixJeShit',
     defaultConfig: { projectId: null },
   }
   ```
4. Voeg type toe aan `widget-preview.tsx`:
   ```typescript
   type: ... | 'fixjeshit';
   ```
5. Build de widget:
   ```bash
   cd packages/fix-je-shit
   npm run build
   ```

## Configuratie

De widget is volledig configureerbaar via JSON. Zie `src/types/config.ts` voor het volledige datamodel.

### Embedden

```html
<div
  data-widget="fix-je-shit"
  data-config='{"branding":{"primaryColor":"#2F8F3F"}}'></div>
<script src="fix-je-shit.iife.js"></script>
```

### React

```tsx
import { FixJeShit } from '@openstad-headless/fix-je-shit';

<FixJeShit config={{ branding: { primaryColor: '#2F8F3F' } }} />;
```

## Bestandsstructuur

```
src/
├── fix-je-shit.tsx          # Entry point
├── types/
│   ├── config.ts            # Admin configuratie types
│   └── index.ts             # Runtime types
├── context/
│   └── QuizContext.tsx       # State management
├── hooks/
│   └── useSwipe.ts          # Swipe detectie
├── components/
│   ├── FixJeShit.tsx        # Hoofd component
│   ├── Landing.tsx          # Landing scherm
│   ├── GemeenteSelector.tsx # Gemeente zoeken
│   ├── QuizCard.tsx         # Quiz vragen
│   ├── ProgressBar.tsx      # Voortgang
│   ├── CategoryBadge.tsx    # Categorie labels
│   ├── SwipeOnboarding.tsx  # Swipe instructie
│   ├── Dashboard.tsx        # Resultaten
│   ├── ScoreCircle.tsx      # Score donut chart
│   ├── ActionCard.tsx       # "Fix dit nu" kaarten
│   ├── HelpCard.tsx         # Hulp kaarten
│   └── ShareActions.tsx     # Delen/PDF/Start
├── utils/
│   ├── skipLogic.ts         # Conditionele vragen
│   ├── scoreCalculator.ts   # Score berekening
│   ├── icons.ts             # SVG iconen
│   └── defaultConfig.ts     # Standaard configuratie
└── styles/
    └── fix-je-shit.css      # Alle styling
```
