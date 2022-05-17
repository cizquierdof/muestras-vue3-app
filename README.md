# Muestras Vue3 y Pinia

App para recoger páginas web de un sitio y gnerar una muestra válida para auditorías del Observatorio de accesibilidad.

La app recopila los datos básicos del sitio: Nombre y dominio y genera un identificador partiendo del nombre eliminando espacios y carácetres no ascii.

Un segundo formulari recobe los datos de als páginas: URL, tipo de página (según estándar del Observatorio), nombre corto y breadcrumb. Cada entrada puede ser borrada y editada individualmente.

Los datos se guardan automáticamente en LocalStorage cada vez que se añade una línea nueva (esto vale también para los datos generales del sitio) y se recuperan automáticamente, siempre que se vuelva a entrar desde la misma dirección.

# Condicionales de los criterios

todos los criterios deben cumplir alguna clase de condición para ser evaluados, por ejemplo para la pestaña R6 la condición es que la página ofrezca ccomunicación bidireccional por voz. Es decir si una página no ofrece comunicación bidireccional por voz se pondrá N/A en todos los criterios de la pestaña.

Los condicionales son:

- R5
    - La TIC tiene características de accesibilidad documentadas: false -> 5.2 = N/A
    - El contenido utiliza características biológicas: false -> 5.3 = N/A
    - El contenido convierte información o comunicaciones: false -> 5.4 = N/A
- Comunicación bidireccional por voz: false -> R6 = N/A
- Cuando el contenido web permita visualizar video: false -> R7 = N/A; R9[9.1.2.1 - 9.1.2.3, 9.1.2.5] = N/A; R10[9.1.2.1 - 9.1.2.3, 9.1.2.5] = N/A
- Cuando el TIC  sea una página web: true -> equivale a poner Clase: Página web en la muestra
- Documento no web: true -> equivale a poner Clase: Documento no web y se superpone con Tipo: Documento descargable
- Herramienta de autor: false -> R11[11.8.1 - 11.8.5] = N/A
- Incluye documentación: false -> R12[12.1.1, 12.1.2] = N/A
- Tiene servicios de apoyo: false -> R12[12.2.2 - 12.2.4] = N/A
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
