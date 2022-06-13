# vitesseVuetifyTemplate

Una semilla del template de vite llamado vitesse con los componentes adaptados de vuetify.
Usando el composition api de vue 3 , los componentes vuetify titan .

## inciar el proyecto

- `npm install` instala lo necesario no da errores.
- `npm run lint` se pasa el eslint
- `npm run test` se tiran los test unitarios en continuo para el develops.
- `npm run dev`  sirve en develop por el puerto 3333 del localhost y abre una ventana en el navegador
- para hacer test e2e hay que hacer primero el build y servirlo por el 4171 de esta forma:

los demas scripts explicados los puedes encontrar en [Readme de scripts](README.scripts.md)

```
    npm run build:noSSG
    npm run preview
    npm test:e2e 
```
## archivios adjuntos no propios del proyecto

Un archivo netlify.toml que sirve     para facilitar el deploy en netlify ahora para hacer comprobaciones hasta que se empiece el proyecto en si . 

Directorio .vscode donde vienen las extensiones que uso yo , no es necesario cargarlas.

## Ejemplo uso de pinia

*TODO*
```
export const useStore = defineStore('main', {
  state: () => ({
  }),
  getters: {
    
  },
  actions: {
  }
}
```
para mayor informacion leer el archivo [README de pinia](README.Pinia.md)


## Ejemplo uso vuetify
*TODO*

## como esta montado el proyecto

- la base ha sido vitesse que es un template de vite para vue. 
    [link al github del proyecto](https://github.com/antfu/vitesse)
```
    npx degit antfu/vitesse vitesseapp
    rm -R vitesseapp/.github
    cd vitesseapp
```


### configuración del proyecto 

seguimos los pasos de :
GitHub - antfu/vitesse: 🏕 Opinionated Vite Starter Template 
en este paso 

“Change the hostname in vite.config.ts”

no aparece el hostname lo mas parecido son las claves de server.host o preview.host, lo hemos pasado a deuda técnica pues no parece que afecte al proyecto.

“… remove routes”

no se a lo que se refiere con esto , porque se crean según los módulos que vas poniendo , creo un issue para mirarlo bien.

se puede seguir con el proyecto .

### instalamos lo necesario para los test de cobertura

```pnpm i c8```

la usaremos para producir el informe del test de cobertura compatible con gitlab. 

y añadimos esto al final de la configuración de vite.config.ts
```
 coverage: {
      reporter: ['text', 'cobertura'],
    },
``` 

### Configuramos eslint para ignore patterns cypress segun indica en el index.js comentados

```
dist
public
cypress/plugins/index.js  
cache/*
cypress/support/index.js
y en .eslintrc
```
y configuramos el eslintrc

```
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
  },
  "globals": {
    "i4t": true,
    "pdfjsLib": true,
    "module": true
  }
}
```

### en el vite.config.ts  evita el problema de warning durante el development si va muy lento borrarlo
```
  css:{
  	devSourcemap : true
  },
```

### para hacer log de los fallos y no salgan por consola
en el main.ts
dentro del 
```viteSSG(
    (ctx)=>{}
)

  //for error loging
    ctx.app.config.errorHandler = (err, vm, info) => {
  // err: error trace
  // vm: component in which error occured
  // info: Vue specific error information such as lifecycle hooks, events etc.
    console.log(err)
    return false
    };
```

### por acccesibilidad 
por accesibilidad añadimos la funcionalidad de go to main content en app.vue
```
const { t } = useI18n()
//skip to main content
const route = useRoute()
const skipLink = ref()

watch(
  () => route.path,
  () => {
    skipLink.value.focus()
  }
)

.....
.....
<ul class="skip-links">
  <li>
    <a href="#main" ref="skipLink">{{ t ('go-main-content') }}</a>
  </li>
</ul>
  <RouterView />
</template>
<style>
.skipLink {
  white-space: nowrap;
  margin: 1em auto;
  top: 0;
  position: fixed;
  left: 50%;
  margin-left: -72px;
  opacity: 0;
}
.skipLink:focus {
  opacity: 1;
  background-color: white;
  padding: 0.5em;
  border: 1px solid black;
}
</style>
```

### para poder usar el vuetify
en vite.congig.ts
```
import {
  Vuetify3Resolver
} from 'unplugin-vue-components/resolvers'

...
...
components:
......
   resolvers: [
        Vuetify3Resolver(),
      ],
```

en /modules crear el archivo vuetify.vue
```
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import { type UserModule } from '~/types'

// Setup 
export const install: UserModule = ({ app }) => {
  const vuetify = createVuetify()
  app.use(vuetify)
}
```
ejecutar
```
npm i vuetify@3.0.0-beta.0
npm i @mdi/font
npm i -D vite-plugin-vuetify
```

### para los test de integracion y e2e que se puedan lanzar con diferente configuracion
creamos los archivos en el directorio raiz  
cypressIntegration.json
```{
    "baseUrl": "http://localhost:4173",
    "chromeWebSecurity": false,
    "env": {
      "baseUrl": "http://localhost:4173/"
    },
    "testFiles": "**/integration/*.*"
  }
```
y cypressE2E.json
```{
    "baseUrl": "http://localhost:4173",
    "chromeWebSecurity": false,
    "env": {
      "baseUrl": "http://localhost:4173/"
    },
    "testFiles": "**/e2e/*.*"
  }
```
### para usar los test de pinia con vitest
ver documentacion de [readme pinia](README.pinia.md)
```
npm i -D @pinia/testing
```

### creamos el archivo gitlab-ci.yml


### gitignore
```
.DS_Store
.vite-ssg-dist
.vite-ssg-temp
*.local
dist
public
dist-ssr
node_modules
.idea/
*.log
cypress/plugins/index.js  
cypress/support/index.js
cache/*
cypress/screenshots/*
cypress/videos
coverage
unitTestReports
lint
```
## Authors and acknowledgment
fgost@everycode.es

## License
to be determined 

## Project status
1.0