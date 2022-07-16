/*************************
 * Constantes comunes
 */

//tipos de páginas admitidos para la muestra

export const PAGE_TYPES = [
  {text: 'Página de inicio', value: 'HOME'},
  {text: 'Inicio de sesión', value: 'SESSION_START'},
  {text: 'Mapa web', value: 'WEB_MAP'},
  {text: 'Contacto', value: 'CONTACT'},
  {text: 'Ayuda', value: 'HELP'},
  {text: 'Legal', value: 'LEGAL'},
  {text: 'Servicio/Proceso', value: 'SERVICE'},
  {text: 'Búsqueda', value: 'SEARCH'},
  {
    text: 'Declaración de accesibilidad',
    value: 'ACCESSIBILITY_DECLARATION',
  },
  {text: 'Mecanismo de comunicación', value: 'COMMUNICATION_MECHANISM'},
  {text: 'Página tipo', value: 'TYPICAL_PAGE'},
  {text: 'Otras páginas', value: 'OTHER'},
  {text: 'Aleatoria', value: 'ALEATORY'},
  {text: 'Documento descargable', value: 'DOWNLOADABLE_DOC'},
];

//un par de páginas para mooking
/*  {
        breadcrumb: "Inicio",
        shortName: "inicio",
        webPageType: "HOME",
        webPageUrl: "https://www.elche.es/",
      },
      {
        breadcrumb: "Inicio/acesibilidad",
        shortName: "accesibilidad",
        webPageType: "ACCESSIBILITY_DECLARATION",
        webPageUrl: "https://www.elche.es/accesibilidad",
      }, */

/*************************************
 * JSON WCAG21
 */

export const WCA21_JSON = [
  {
    Perceptible: [
      {'1.1.1': 'Contenido no textual'},
      {'1.2.1': 'Solo audio y solo video'},
      {'1.2.2': 'Subtítulos (grabado)'},
      {'1.2.3': 'Audiodescripción o medio alternativo'},
      {'1.2.4': 'Subtítulos (directo)'},
      {'1.2.5': 'Audiodescripción (grabado)'},
      {'1.3.1': 'Información y relaciones'},
      {'1.3.2': 'Secuencia significativa'},
      {'1.3.3': 'Características sensoriales'},
      {'1.3.4': 'Orientación'},
      {'1.3.5': 'Identificar el propósito del campo'},
      {'1.4.1': 'Uso del color'},
      {'1.4.2': 'Control del audio'},
      {'1.4.3': 'contraste mínimo'},
      {'1.4.4': 'Redimensión del texto'},
      {'1.4.5': 'Imágenes de texto'},
      {'1.4.10': 'Redistribución'},
      {'1.4.11': 'Contraste en elementos no textuales'},
      {'1.4.12': 'Espaciado del texto'},
      {'1.4.13': 'Contenido en hover o focus'},
    ],
  },
  {
    Operable: [
      {'2.1.1': 'Teclado'},
      {'2.1.2': 'Sin trampas para el teclado'},
      {'2.1.4': 'Atajos de teclado'},
      {'2.2.1': 'Tiempo ajustable'},
      {'2.2.2': 'Pausar, detener, ocultar'},
      {'2.3.1': 'Destellos'},
      {'2.4.1': 'Evitar bloques'},
      {'2.4.2': 'Títulos de página'},
      {'2.4.3': 'Orden del foco'},
      {'2.4.4': 'Propósito de los enlaces'},
      {'2.4.5': 'Múltiples vías'},
      {'2.4.6': 'Encabezados y etiquetas'},
      {'2.4.7': 'Foco visible'},
      {'2.5.1': 'Gestos del puntero'},
      {'2.5.2': 'Cancelación del puntero'},
      {'2.5.3': 'Etiqueta en e nombre'},
      {'2.5.4': 'Activación mediante movimiento'},
    ],
  },
  {
    Comprensible: [
      {'3.1.1': 'Idioma de la página'},
      {'3.1.1': 'Idioma de las partes'},
      {'3.2.1': 'Al recibir el foco'},
      {'3.2.2': 'Al recibir entradas'},
      {'3.2.3': 'Navegación coherente'},
      {'3.2.4': 'Identificación coherente'},
      {'3.3.1': 'Identificación de errores'},
      {'3.3.2': 'etiquetas o instrucciones'},
      {'3.3.3': 'Sugerencias ante errores'},
      {'3.3.4': 'Prevención de errores (legales, financieros, datos'},
    ],
  },
  {
    Robusto: [
      {'4.1.1': 'Procesamiento'},
      {'4.1.2': 'Nombre, función, valor'},
      {'4.1.3': 'Mensajes de estado'},
    ],
  },
];
