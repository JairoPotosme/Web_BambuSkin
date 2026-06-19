# BambuSkin Lab

Página web del proyecto BambuSkin Lab — exfoliante y limpiador facial natural con esencia de bambú.

## Archivos del proyecto

- `index.html` — Página principal
- `styles.css` — Estilos
- `script.js` — Animaciones e interactividad

## Cómo abrir en Visual Studio Code

1. Abre VS Code
2. Ve a **Archivo → Abrir carpeta**
3. Selecciona exactamente esta ruta:

```
C:\Users\HP\Downloads\Web_BambuSkin
```

4. Debes ver `index.html` con **más de 600 líneas** de código
5. Si aparece vacío: cierra la pestaña, clic derecho en `index.html` → **Revertir archivo**

## Cómo publicar en GitHub Pages

### Paso 1: Renombrar el repositorio (importante)

El nombre **"BambuSkin Web"** (con espacio) causa problemas en la URL.

En GitHub → **Settings → Repository name** → cámbialo a:

```
BambuSkin-Web
```

### Paso 2: Subir los archivos a la raíz

Los 3 archivos deben estar **en la raíz** del repositorio, NO dentro de una subcarpeta:

```
BambuSkin-Web/
├── index.html    ← obligatorio
├── styles.css
├── script.js
└── README.md
```

### Paso 3: Activar GitHub Pages

1. GitHub → tu repositorio → **Settings**
2. **Pages** (menú izquierdo)
3. **Source:** Deploy from a branch
4. **Branch:** `main` → carpeta `/ (root)` → **Save**

### Paso 4: URL correcta

Después de 1–2 minutos, tu sitio estará en:

```
https://jairopotosme.github.io/BambuSkin-Web/
```

## Subir con Git (terminal)

```bash
cd C:\Users\HP\Downloads\Web_BambuSkin
git init
git add .
git commit -m "Sitio web BambuSkin Lab"
git branch -M main
git remote add origin https://github.com/jairopotosme/BambuSkin-Web.git
git push -u origin main
```

## Autores

Jairo Sánchez y José Ángulo
