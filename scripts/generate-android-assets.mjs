/**
 * generate-android-assets.mjs
 * Genera todos los assets nativos de Android para Campus Maestro App:
 *  - Iconos adaptativos (foreground + background) en todos los densities
 *  - Splash screen drawable
 *  - Icon legado (mipmap-*)
 *
 * Uso: node scripts/generate-android-assets.mjs
 * Requiere: sharp (ya en devDependencies)
 */
import { createCanvas } from "@napi-rs/canvas";
import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ANDROID_RES = join(ROOT, "android", "app", "src", "main", "res");

// Colores de la marca Campus Maestro
const BG_COLOR = "#0a0f14";
const PRIMARY = "#10845f";
const ACCENT = "#0ec96e";
const WHITE = "#ffffff";

// Configuración de densidades Android
const DENSITIES = [
  { name: "mipmap-mdpi",    size: 48,  adaptive: 108 },
  { name: "mipmap-hdpi",    size: 72,  adaptive: 162 },
  { name: "mipmap-xhdpi",   size: 96,  adaptive: 216 },
  { name: "mipmap-xxhdpi",  size: 144, adaptive: 324 },
  { name: "mipmap-xxxhdpi", size: 192, adaptive: 432 },
];

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

/**
 * Dibuja el icono de Campus Maestro en un canvas.
 * @param {number} size - Tamaño total del canvas.
 * @param {boolean} adaptive - Si es true, deja safe zone interna.
 */
function drawIcon(size, adaptive = false) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  const center = size / 2;
  const scale = size / 1024;

  // Fondo
  ctx.fillStyle = BG_COLOR;
  if (adaptive) {
    ctx.fillRect(0, 0, size, size);
  } else {
    // Esquinas redondeadas para icono legado
    const radius = size * 0.22;
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(size - radius, 0);
    ctx.quadraticCurveTo(size, 0, size, radius);
    ctx.lineTo(size, size - radius);
    ctx.quadraticCurveTo(size, size, size - radius, size);
    ctx.lineTo(radius, size);
    ctx.quadraticCurveTo(0, size, 0, size - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.fill();
  }

  // Anillo decorativo exterior
  ctx.beginPath();
  ctx.arc(center, center, 420 * scale, 0, Math.PI * 2);
  ctx.strokeStyle = PRIMARY + "55";
  ctx.lineWidth = 6 * scale;
  ctx.stroke();

  // Barra horizontal (base del mortero)
  ctx.fillStyle = PRIMARY;
  ctx.beginPath();
  const barH = center - 50 * scale;
  ctx.roundRect(
    center - 150 * scale, barH - 14 * scale,
    300 * scale, 28 * scale,
    14 * scale
  );
  ctx.fill();

  // Tablero del mortero (trapecio simplificado)
  ctx.fillStyle = PRIMARY;
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  ctx.moveTo(center, center - 212 * scale);        // top center
  ctx.lineTo(center + 180 * scale, barH);          // bottom right
  ctx.lineTo(center - 180 * scale, barH);          // bottom left
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;

  // Texto CM
  const fontSize = Math.round(148 * scale);
  ctx.fillStyle = WHITE;
  ctx.font = `700 ${fontSize}px "Helvetica Neue", Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("CM", center, center + 140 * scale);

  // Punto indicador verde
  ctx.fillStyle = ACCENT;
  ctx.beginPath();
  ctx.arc(center + 168 * scale, center + 208 * scale, 22 * scale, 0, Math.PI * 2);
  ctx.fill();

  return canvas;
}

/**
 * Dibuja el fondo adaptativo (color sólido de marca).
 */
function drawAdaptiveBg(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

async function main() {
  console.log("Generando assets nativos Android para Campus Maestro...\n");

  for (const density of DENSITIES) {
    const dir = join(ANDROID_RES, density.name);
    mkdirSync(dir, { recursive: true });

    // 1. Icono legado (ic_launcher.png) — esquinas redondeadas
    const legacyCanvas = drawIcon(density.size);
    const legacyBuffer = legacyCanvas.toBuffer("image/png");
    writeFileSync(join(dir, "ic_launcher.png"), legacyBuffer);

    // 2. Icono circular (ic_launcher_round.png)
    const roundCanvas = createCanvas(density.size, density.size);
    const roundCtx = roundCanvas.getContext("2d");
    const half = density.size / 2;
    roundCtx.beginPath();
    roundCtx.arc(half, half, half, 0, Math.PI * 2);
    roundCtx.fillStyle = BG_COLOR;
    roundCtx.fill();
    roundCtx.clip();
    const iconForRound = drawIcon(density.size, true);
    roundCtx.drawImage(iconForRound, 0, 0);
    writeFileSync(join(dir, "ic_launcher_round.png"), roundCanvas.toBuffer("image/png"));

    // 3. Foreground adaptativo (ic_launcher_foreground.png)
    const fgCanvas = drawIcon(density.adaptive, true);
    writeFileSync(join(dir, "ic_launcher_foreground.png"), fgCanvas.toBuffer("image/png"));

    // 4. Background adaptativo (ic_launcher_background.png)
    const bgCanvas = drawAdaptiveBg(density.adaptive);
    writeFileSync(join(dir, "ic_launcher_background.png"), bgCanvas.toBuffer("image/png"));

    console.log(`  ✓ ${density.name} (${density.size}px / adaptive ${density.adaptive}px)`);
  }

  // Splash screen drawable (drawable-land-night-xxhdpi para compatibilidad amplia)
  const splashDirs = [
    "drawable",
    "drawable-night",
    "drawable-land",
  ];

  for (const splashDir of splashDirs) {
    const dir = join(ANDROID_RES, splashDir);
    mkdirSync(dir, { recursive: true });

    // Splash simple: fondo de marca con "CM" centrado
    const splashSize = 1080;
    const splashCanvas = createCanvas(splashSize, splashSize);
    const ctx = splashCanvas.getContext("2d");
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, splashSize, splashSize);

    // Logo central
    const logoSize = 280;
    const logoX = (splashSize - logoSize) / 2;
    const logoY = (splashSize - logoSize) / 2;
    const logoCanvas = drawIcon(logoSize);
    ctx.drawImage(logoCanvas, logoX, logoY);

    writeFileSync(join(dir, "splash.png"), splashCanvas.toBuffer("image/png"));
    console.log(`  ✓ ${splashDir}/splash.png`);
  }

  // Splash para API 12+ (XML con referencias a colores y drawable)
  const splashXmlDir = join(ANDROID_RES, "drawable");
  const splashXml = `<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item>
        <color android:color="@color/splash_background"/>
    </item>
    <item
        android:width="280dp"
        android:height="280dp"
        android:gravity="center">
        <bitmap
            android:src="@drawable/splash_icon"
            android:scaleType="fitCenter"/>
    </item>
</layer-list>`;
  writeFileSync(join(splashXmlDir, "splash_screen.xml"), splashXml);
  console.log("  ✓ drawable/splash_screen.xml");

  // Colors resource
  const valuesDir = join(ANDROID_RES, "values");
  mkdirSync(valuesDir, { recursive: true });

  // splash_icon.png (ícono para el XML del splash)
  const splashIconCanvas = drawIcon(512);
  writeFileSync(join(splashXmlDir, "splash_icon.png"), splashIconCanvas.toBuffer("image/png"));
  console.log("  ✓ drawable/splash_icon.png");

  console.log("\n✅ Assets Android generados correctamente.");
  console.log("   Sincroniza con: npx cap sync android");
}

main().catch(console.error);
