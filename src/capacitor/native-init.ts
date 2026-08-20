/**
 * native-init.ts — Campus Maestro
 *
 * Inicialización de plugins nativos de Capacitor.
 * Solo se activan cuando la app corre en un contexto nativo (Android / iOS).
 * En el navegador web todas las importaciones son no-ops seguros.
 */
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { App } from '@capacitor/app';
import { Keyboard } from '@capacitor/keyboard';

/** true solo cuando se ejecuta dentro de una app nativa compilada. */
export const isNativeApp = Capacitor.isNativePlatform();

/**
 * Configura status bar, splash screen y teclado nativos.
 * Llamar al inicio, antes del primer render o inmediatamente después.
 */
export async function initNative(): Promise<void> {
  if (!isNativeApp) return;

  try {
    // Status Bar: color de marca Campus Maestro, texto claro sobre fondo oscuro.
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#10845f' });
    await StatusBar.setOverlaysWebView({ overlay: false });
  } catch {
    // No romper si StatusBar no está disponible (ej. iOS sin configurar).
  }

  try {
    // Ocultar splash cuando React ya montó el árbol de componentes.
    await SplashScreen.hide({ fadeOutDuration: 400 });
  } catch {
    // No romper si ya estaba oculto.
  }

  try {
    // Teclado: sin bounce, sin saltos bruscos al editar inputs.
    Keyboard.setResizeMode({ mode: 'body' as Parameters<typeof Keyboard.setResizeMode>[0]['mode'] });
  } catch {
    // No-op en iOS si el plugin no está configurado.
  }

  // Manejar el botón de retroceso de Android para evitar salir accidentalmente.
  App.addListener('backButton', ({ canGoBack }) => {
    if (canGoBack) {
      window.history.back();
    } else {
      // Primera página: minimizar la app en lugar de cerrarla.
      App.minimizeApp();
    }
  });
}
