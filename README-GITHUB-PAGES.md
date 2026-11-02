# RETS Chromebook — GitHub Pages

Esta carpeta contiene una preparación de RETS PWA para publicarse como sitio de proyecto de GitHub Pages.

## Publicar

1. Crea un repositorio nuevo en GitHub, por ejemplo `rets-chromebook`.
2. Sube **el contenido de esta carpeta** a la raíz del repositorio (index.html debe quedar en la raíz).
3. En GitHub abre Settings → Pages.
4. En Build and deployment selecciona Deploy from a branch.
5. Selecciona la rama `main` y la carpeta `/ (root)`, y guarda.
6. Espera a que GitHub Pages publique el sitio mediante HTTPS.
7. Abre la URL publicada en ChromeOS.

## Instalar en ChromeOS

Abre la URL HTTPS en Chrome. Si el administrador permite instalar aplicaciones web, utiliza el icono de instalación de la barra de direcciones o el menú de Chrome.

## Notas técnicas

- Las rutas de HTML, manifiesto, iconos, CSS y JavaScript se han hecho relativas para soportar una URL de proyecto como `https://usuario.github.io/rets-chromebook/`.
- El Service Worker usa el directorio de despliegue como ámbito y precarga el núcleo de la aplicación.
- Los recursos remotos, como Google Fonts, necesitan conexión a Internet.
- La caché permite recuperar el shell de la aplicación después de una primera carga correcta. No garantiza que todas las funciones o servicios remotos trabajen sin conexión.
- La instalación puede estar deshabilitada por las políticas de administración de una Chromebook escolar. Esta preparación no intenta eludir esas políticas.

## Importante

Esta es una preparación de publicación, no una publicación ya realizada. Antes de considerarla estable, prueba la URL real en ChromeOS y revisa DevTools → Application → Manifest / Service Workers y Console.
