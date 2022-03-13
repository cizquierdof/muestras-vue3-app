# Muestras Vue3 y Pinia

App para recoger páginas web de un sitio y gnerar una muestra válida para auditorías del Observatorio de accesibilidad.

La app recopila los datos básicos del sitio: Nombre y dominio y genera un identificador partiendo del nombre eliminando espacios y carácetres no ascii.

Un segundo formulari recobe los datos de als páginas: URL, tipo de página (según estándar del Observatorio), nombre corto y breadcrumb. Cada entrada puede ser borrada y editada individualmente.

Los datos se guardan automáticamente en LocalStorage cada vez que se añade una línea nueva (esto vale también para los datos generales del sitio) y se recuperan automáticamente, siempre que se vuelva a entrar desde la misma dirección.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
