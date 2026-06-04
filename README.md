# Winterfall Fillable Character Sheet

Static web app generated from the AcroForm version of the Winterfall character sheet.

## Run

```powershell
node server.js
```

Open `http://127.0.0.1:5173`.

If that port is already in use:

```powershell
$env:PORT='5174'
node server.js
```

## Verify

```powershell
$env:NODE_PATH='C:\Users\geekc\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules;C:\Users\geekc\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\node_modules'
$env:APP_URL='http://127.0.0.1:5173'
node scripts\verify.cjs
```

## What It Does

- Renders the remastered two-page Winterfall sheet artwork.
- Normalizes both pages to the same `810 x 1024` canvas without stretching the original page artwork.
- Places 114 HTML form controls over the extracted AcroForm rectangles.
- Autosaves values in browser storage.
- Exports and imports JSON.
- Provides selection-preserving rich-text controls for font family, size, weight, alignment, and color.
- Uses a corrected base layout for the extracted fields, then lets users resize and drag individual text boxes while preserving exported PDF placement.
- Keeps editable field overlays transparent until hover or focus.
- Exports a flattened filled PDF that preserves the original sheet artwork.
