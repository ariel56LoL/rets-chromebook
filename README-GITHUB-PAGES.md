# RETS Chromebook — paquete corregido para GitHub Pages

## Publicación
1. En GitHub, abre el repositorio `rets-chromebook`.
2. Sustituye los archivos de la raíz por el contenido de este ZIP, manteniendo las carpetas `assets`, `icons` y `__grok`.
3. Comprueba que `index.html` quede directamente en la raíz del repositorio, no dentro de otra carpeta.
4. Confirma los cambios en la rama `main`.
5. En Settings → Pages, mantén `Deploy from a branch`, `main` y `/ (root)`.
6. Espera a que el despliegue de GitHub Pages aparezca en verde y abre:
   https://ariel56lol.github.io/rets-chromebook/

## Qué corrige este paquete
- Rutas relativas para los archivos, manifiesto e iconos de GitHub Pages.
- Normalización de la URL del proyecto con barra final.
- `basepath` del router configurado para `/rets-chromebook`.
- Service Worker con caché versionada y rutas dentro del proyecto; no transforma rutas `/api/` en páginas de la aplicación.
- Barra RETS expandida por defecto, también al migrar la configuración local anterior.
- La navegación externa ya no solicita `/api/proxy` (endpoint que GitHub Pages no puede ejecutar). En su lugar, muestra una acción explícita para abrir la dirección en una pestaña normal de Chrome, sin presentar el 404 de GitHub como si fuera el sitio visitado.

## Límites importantes de esta versión PWA
GitHub Pages solo aloja archivos estáticos. No ejecuta un servidor, un proxy web ni un motor Chromium embebido. Por eso, los sitios externos se abren en Chrome fuera de la interfaz RETS. Para que las páginas se rendericen dentro de las pestañas de RETS, se necesita una versión con motor nativo (por ejemplo, una aplicación empaquetada para ChromeOS/Android compatible) o un backend de navegación mantenido y configurado aparte. Una PWA alojada en GitHub Pages no puede convertirse por sí sola en un navegador Chromium completo.

## Datos que conserva la PWA
La app ya usa almacenamiento local del navegador para ajustes, historial, pestañas/sesión, perfiles locales, notas y descargas; RETS Vault usa IndexedDB y cifrado Web Crypto. Estos datos permanecen en el dispositivo/perfil de Chrome y no se sincronizan automáticamente entre dispositivos. No borres los datos del sitio si deseas conservarlos.

Los perfiles de RETS guardan información de perfil en el dispositivo, pero esta PWA no conserva una sesión de Google independiente por perfil. Las cookies y contraseñas de los sitios que abras fuera de RETS quedan bajo el control del navegador Chrome. Las páginas que recorras después de salir a Chrome no se copian automáticamente al historial interno de RETS.

El gestor de contraseñas de prueba se desactivó porque la versión anterior guardaba contraseñas sin cifrado. Usa el gestor de contraseñas de Chrome. Si anteriormente guardaste contraseñas reales en el antiguo panel de RETS, considera cambiarlas y borrar la entrada `rets-passwords` de los datos locales del sitio.

## Actualización tras instalar una versión anterior
Si ves una versión antigua, cierra todas las pestañas de RETS, vuelve a abrir el sitio y usa una recarga completa. En Chrome de escritorio puedes usar `Ctrl + Shift + R`. En móvil, borra solo la caché del sitio si sigue sirviendo archivos antiguos; no borres el almacenamiento del sitio si quieres conservar tus datos.
