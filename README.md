# intercheck-extension

Código fuente para la versión de Intercheck como extensión de chrome.

## Características

- [x] Latencia (tiempo de respuesta)
- [x] Velocidad de descarga
- [ ] Velocidad de carga

- [x] Visualización del histórico
- [ ] Estadísticas por visualización (media, máx, min, etc)
- [ ] Generación de reportes

## Alcance

Al ser una extensión de chrome, todos los navegadores compatibles con chrome pueden utilizar este recurso, tal como Chromium, Opera, Brave, Chrome.

## Desarrollo

Al ser una extensión, no se puede probar por fuera, debe cargarse como extensión de chrome.

```bash
# Instalar dependencias
yarn install

# Construir archivos de extensión
yarn build
```

Finalmente, cargar la carpeta `build` hacia Chrome, en `chrome://extensions`.
